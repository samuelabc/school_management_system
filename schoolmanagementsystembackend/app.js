const express = require('express')
const app = express()
const studentsRouter = require('./controllers/students')
const teachersRouter = require('./controllers/teachers')
const coursesRouter = require('./controllers/courses')

app.use(express.json())
app.use('/api/students', studentsRouter)
app.use('/api/teachers', teachersRouter)
app.use('/api/courses', coursesRouter)

module.exports = app
