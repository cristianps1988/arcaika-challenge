const express = require('express')
const cors = require('cors')
require('dotenv').config();

const { dbConnection } = require('./db/config')


const app = express()

dbConnection()

app.use(cors())

app.use(express.json())

app.use('/video', require('./routes/video'))

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto 4000`)
})