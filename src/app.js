const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const middlewares = require('./middlewares')
const app = express()
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json')

app.use(morgan('tiny'))
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
const Fine = require('./api/controllers/controllerFines')
const Auth = require('./api/controllers/controllerAuth')

app.get('/api/v1/fines', Fine.findAllFines)
app.get('/api/v1/fines/:id', Fine.findAFine)
app.post('/api/v1/fines', Fine.addFine)
app.patch('/api/v1/fines/:id', Fine.updateAFine)
app.delete('/api/v1/fines/:id', Fine.deleteAFine)

app.post('/api/v1/login', Auth.login)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = app
