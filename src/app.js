import 'dotenv/config'
import express from 'express'
import router from './route.js'
import KnexSessionStore from 'connect-session-knex'
import morgan from 'morgan'
import knex from "knex";
import config from "./knexfile.js";
import cors from "cors";
import session from 'express-session'
import exceptionMiddleware from './middleware/exception-middleware.js'
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./swagger.js"

// KnexSessionStore(session)

let db = knex(config[process.env.NODE_ENV || 'development']);

const knexSession = KnexSessionStore(session);
const store = new knexSession({
    tablename: 'sessions',
    sidfieldname: 'session_id',
    knex: db,
    createtable: true,
    clearInterval: 30000,

})

const app = express()

app.use(cors());

// middleware to parse json from req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// session
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1800000 //30 minutes
        },
        store
    })
)
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))

// your solution triggers the db tables during the health check, health should always be here, consider making the change
app.get('/health', async (req, res) => {
    res.send('ok');
})

// for the swagger api documentation
app.use('/api-doc/hci-healthcare', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// finding a way to do migration, prod ready
app.get('/migrate', async (req, res) => {

    // global variable to store the error
    let e;

    async function testDatabaseConnection() {
        try {
            // Test the database connection by running a simple query
            await db.raw("SELECT 1");
            console.log("Database connection successful!");
            return true; // Connection is valid
        } catch (error) {
            console.error("Database connection failed:", error);
            return false; // Connection failed
        }
    }

    try {

        // Test the database connection first
        const isConnectionValid = await testDatabaseConnection();

        if (!isConnectionValid) {
            throw new Error("Database connection failed. Migrations aborted.");
        }

        // If the connection is valid, run migrations
        await db.migrate.latest();

        console.log("Migrations completed successfully");

    } catch (error) {
        e = error
        console.error('migration err', error);
    } finally {
        console.log("what is e? e is : ", e)
        if (!e) {
            console.log('Migrations completed');
            res.send('Migrations completed, check the database if the tables were created');
        } else {
            console.log('Error Found, Migrations did not complete successfully');
            res.status(500).json({ message: `Migration failed the error is: ${e.message}` });
        }

    }
})

app.use('/v1', router)

app.use(exceptionMiddleware)

export default app;