require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('../server/authController')
const timeCtrl = require('../server/timeClockController')
const jobCtrl = require('../server/jobsController')
const goalCtrl = require('../server/goalController')


const app = express()

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env
app.use(express.json())


app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

//Auth Controller
app.post('/api/auth/register', authCtrl.registerUser)
app.post('/api/auth/login', authCtrl.loginUser)
app.post('/api/auth/logout', authCtrl.logoutUser)
app.get('/api/auth/user', authCtrl.getUser)

//Clock Controller
app.post('/api/user/clockin', timeCtrl.clockIn)
app.put('/api/user/clockout', timeCtrl.clockOut)
app.get('/api/user/clock/:date', timeCtrl.getTodaysTimes)
app.get('/api/user/clock/alltimes', timeCtrl.getAllTimes)
app.get('/api/clock/options', timeCtrl.getClockOptions)

//Job Controller
app.post('/api/user/jobs', jobCtrl.saveJobs)
app.get('/api/users/jobs/:date', jobCtrl.getJobs)
app.put('/api/users/jobs/:id', jobCtrl.editJob)
app.delete('/api/users/jobs/:id', jobCtrl.deleteJob)
app.get('/api/users/jobs', jobCtrl.getAllJobs)

//Goal Controller
app.post('/api/user/goals/daily', goalCtrl.postDailyGoals)
app.put('/api/user/goals/daily', goalCtrl.putDailyGoals)
app.get('/api/user/goals/daily', goalCtrl.getDailyGoals)


massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB is alive!')
  app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is alive!`))
})

