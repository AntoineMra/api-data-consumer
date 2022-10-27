const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

require('dotenv').config()

const middlewares = require('./middlewares')
const app = express()
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json')

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
const Fine = require('./api/controllers/controllerFines')

app.get('/api/v1/fines', Fine.findAllFines)
app.get('/api/v1/fines/:id', Fine.findAFine)
app.post('/api/v1/fines', Fine.addFine)
app.patch('/api/v1/fines/:id', Fine.updateAFine)
app.delete('/api/v1/fines/:id', Fine.deleteAFine)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = app
