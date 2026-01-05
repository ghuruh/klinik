const { Sequelize } = require('sequelize');
const path = require('path');

const dbUrl = process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

let sequelize;

if (dbUrl && dbUrl.startsWith('libsql://')) {
  // Config for Turso via Custom Bridge
  const createLibsqlBridge = require('./libsql-bridge');
  const bridge = createLibsqlBridge({ url: dbUrl, authToken: authToken });
  
  sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: bridge,
    storage: ':memory:',
    logging: false,
  });
} else if (dbUrl && dbUrl.startsWith('postgres')) {
  // Config for Postgres (Supabase/Heroku)
  sequelize = new Sequelize(dbUrl, {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Local SQLite fallback
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'),
    logging: false,
  });
}

module.exports = sequelize;
