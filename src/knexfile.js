import  {config as env} from 'dotenv'
env({path: '../.env'})

console.log(process.env.DB_HOST)

const config = {
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
      tableName: "knex_migrations"
    }
  },


  production: {
    client: 'nill',
    connection: {
      host: 'nill',
      port: 0,
      user: 'nill',
      password: 'nill',
      database: 'nill',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default config;
