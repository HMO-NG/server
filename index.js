import 'dotenv/config'
import express from 'express'
import router from './route.js'
import KnexSessionStore from 'connect-session-knex'

import knex from "knex";
import config from "./src/knexfile.js";


import session from 'express-session'

import exceptionMiddleware from './src/middleware/exception-middleware.js'
// KnexSessionStore(session)

let db = knex(config[process.env.NODE_ENV || 'development']);


const knexSession = KnexSessionStore(session);
const store = new knexSession({
    tablename:'sessions',
    sidfieldname:'session_id',
    knex:db,
    createtable:true,
    clearInterval:30000,

})

const port = process.env.PORT

const app = express()

// middleware to parse json from req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// session
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge:900000
        },
        store
    })
)

app.use('/api/v1', router)

app.use(exceptionMiddleware)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
