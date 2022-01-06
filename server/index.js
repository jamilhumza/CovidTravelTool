require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pool = require('./dbhandler')
const app = express()

app.use(express.json())
app.use(cors())
app.use(require('./routes/apicall'))

const port = process.env.port || 4000

app.listen(port, () => console.log('Server started'))
