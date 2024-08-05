import {config as env} from 'dotenv'
import fs from 'fs'
import path from "path";

env({path: '../.env'})


const config = {
    test: {
        client: 'sqlite3',
        connection: {
            filename: 'test.db3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: 'src/migrations',
            loadExtensions: ['.js'],
            tableName: "knex_migrations"
        }
    },
    development: {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: 'src/migrations',
            loadExtensions: ['.js'],
            tableName: "knex_migrations"
        }
    },
    production: {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD || fs.readFileSync(process.env.DB_PASSWORD_FILE, 'utf8').trim(),
            database: process.env.DB_NAME,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: 'dist/migrations',
            loadExtensions: ['.js'],
            tableName: "knex_migrations"
        }
    },

};

export default config;
