const { createClient } = require('@libsql/client');

function createLibsqlBridge(options) {
    const client = createClient({
        url: options.url,
        authToken: options.authToken,
    });

    const bridge = {
        OPEN_READONLY: 1,
        OPEN_READWRITE: 2,
        OPEN_CREATE: 4,
        verbose: function() { return this; },
        Database: class Database {
            constructor(dbPath, mode, callback) {
                this.client = client;
                const cb = typeof mode === 'function' ? mode : callback;
                if (typeof cb === 'function') setImmediate(() => cb(null));
                
                // Track state for Sequelize
                this.open = true;
            }

            all(sql, params, callback) {
                const cb = typeof params === 'function' ? params : callback;
                const args = Array.isArray(params) ? params : (typeof params === 'object' ? Object.values(params) : []);
                
                client.execute({ sql, args })
                    .then(res => {
                        const rows = res.rows.map(r => {
                            const obj = {};
                            res.columns.forEach((col, i) => obj[col] = r[i]);
                            return obj;
                        });
                        cb(null, rows);
                    })
                    .catch(err => cb(err));
            }

            get(sql, params, callback) {
                const cb = typeof params === 'function' ? params : callback;
                const args = Array.isArray(params) ? params : (typeof params === 'object' ? Object.values(params) : []);

                client.execute({ sql, args })
                    .then(res => {
                        if (res.rows.length === 0) return cb(null, null);
                        const r = res.rows[0];
                        const obj = {};
                        res.columns.forEach((col, i) => obj[col] = r[i]);
                        cb(null, obj);
                    })
                    .catch(err => cb(err));
            }

            run(sql, params, callback) {
                const cb = typeof params === 'function' ? params : callback;
                const args = Array.isArray(params) ? params : (typeof params === 'object' ? Object.values(params) : []);

                client.execute({ sql, args })
                    .then(res => {
                        const result = {
                            lastID: res.lastInsertRowid !== undefined ? Number(res.lastInsertRowid) : undefined,
                            changes: res.rowsAffected
                        };
                        // Sequelize calls cb with 'this' as result
                        if (cb) cb.call(result, null);
                    })
                    .catch(err => {
                        if (cb) cb(err);
                    });
            }

            exec(sql, callback) {
                client.execute(sql)
                    .then(() => { if(callback) callback(null); })
                    .catch(err => { if(callback) callback(err); });
            }

            close(callback) {
                this.open = false;
                if(callback) callback(null);
            }

            serialize(callback) {
                if(callback) callback();
            }

            configure(option, value) {}
        }
    };

    return bridge;
}

module.exports = createLibsqlBridge;
