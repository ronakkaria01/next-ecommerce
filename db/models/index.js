'use strict';

import { readdirSync } from 'fs';
import { basename as _basename } from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { development, production } from "../config/config";

const basename = _basename(import.meta.url);
const env = process.env.NODE_ENV || 'development';
const config = env === 'production' ? production : development
const modelsDir = `${process.cwd()}/db/models/` || __dirname;
const models = {}

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

const importModels = async () => {
  const files = readdirSync(modelsDir)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js');

  for (const file of files) {
    try {
      const modelModule = await import(`@/db/models/${file.slice(0, -3)}`);
      const modelDefiner = modelModule.default || modelModule;
      const model = modelDefiner(sequelize, DataTypes);
      models[model.name] = model;
    } catch (error) {
      console.error('Error importing module:', error);
    }
  }

  Object.keys(models)
    .forEach((modelName) => {
      if (typeof models[modelName].associate === 'function') {
        models[modelName].associate(models);
      }
    });
};

// Call the function to import models
importModels().then(() => {
  // sequelize.sync({ force: true }).then(() => {
  //   // console.log("Drop and re-sync db.");
  // }).catch((err) => {
  //   console.log(err)
  // });
});

export {
  sequelize,
  Sequelize,
  models
}
