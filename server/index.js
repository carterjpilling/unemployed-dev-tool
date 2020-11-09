require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('../server/authController')


const app = express()

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env
app.use(express.json())


app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))


app.post('/api/auth/register', authCtrl.registerUser)
app.post('/api/auth/login', authCtrl.loginUser)
app.post('/api/auth/logout', authCtrl.logoutUser)
app.get('/api/auth/user', authCtrl.getUser)


massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB is alive!')
  app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is alive!`))
})

