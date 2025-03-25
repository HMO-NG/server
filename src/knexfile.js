import { config as env } from 'dotenv'
import fs from 'fs'
import path from "path";
import { fileURLToPath } from 'url';

// Define __dirname equivalent for ES modules
// const __filename = fileURLToPath(import.meta.url); // Get the file path
// const __dirname = path.dirname(__filename);       // Get the directory name

// Determine the environment
const environment = process.env.NODE_ENV || 'development';

// Load the appropriate .env file based on the environment
// if (environment === 'development') {
    // env({ path: '../.dev.env' });
// } else {
    env({ path: '../.env' });
// }

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
        // TODO THERE IS A BUG THAT OCCURS WHEN A SECOND
        // .ENV FILE IS USED SO I HAD TO USE THE STRING

        // client: process.env.DEV_DB_CLIENT,
        // connection: {
        //     host: process.env.DEV_DB_HOST,
        //     port: process.env.DEV_DB_PORT,
        //     user: process.env.DEV_DB_USER,
        //     password: process.env.DEV_DB_PASSWORD,
        //     database: process.env.DEV_DB_NAME,
        // },
        client: "pg",
        connection: {
            host: "127.0.0.1",
            port: 5432,
            user: "postgres",
            password: "test@123",
            database: 'hmo',
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
