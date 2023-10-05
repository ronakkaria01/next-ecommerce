'use strict';

import { readdirSync } from 'fs';
import { basename as _basename } from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { development, production } from "../config/config";

const basename = _basename(import.meta.url);
const env = process.env.NODE_ENV || 'development';
const config = env === 'production' ? production : development
const db = {};
const modelsDir = `${process.cwd()}/db/models/` || __dirname;

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

readdirSync(modelsDir)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(async file => {
    try {
      const modelModule = await import(`@/db/models/${file.slice(0, -3)}`);
      const modelDefiner = modelModule.default || modelModule;
      const model = modelDefiner(sequelize, DataTypes);
      db[model.name] = model;
    } catch (error) {
      console.error('Error importing module:', error);
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
