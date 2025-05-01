require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./models')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./router'))

const port = process.env['PORT_' + process.env.RUN_MODE]
app.listen(port, () => {
    console.log('Server is running on ' + port)
})