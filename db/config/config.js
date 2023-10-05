'use strict';
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE } = process.env
const dialect = "mysql";
const pool = {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
};
const define = {
    freezeTableName: true,
}

export const development = {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    dialect,
    pool: {
        max: 2,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define
};

export const production = {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    dialect,
    pool,
    define
};