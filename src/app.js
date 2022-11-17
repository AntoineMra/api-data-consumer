const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const { uuid } = require('uuidv4')
const mongo = require('mongodb')

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

const uri = `mongodb+srv://test:GrG8VfNSJgddQ0wl@cluster0.qigutbk.mongodb.net/?retryWrites=true&w=majority`
const client = new mongo.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

client.connect().then(() => {
  const dataset = client.db('test').collection('dataset')
  const users = client.db('test').collection('users')
  const auth = require('./auth/auth')

  app.get('/api/v1/fines', auth.authenticateToken, (req, res) => {
    dataset
      .find()
      .toArray()
      .then((results) => {
        res.send({ results })
      })
  })
  app.get('/api/v1/fines/:id', auth.authenticateToken, (req, res) => {
    dataset
      .find({ ID: parseInt(req.params.id) })
      .toArray()
      .then((results) => {
        res.send({ results })
      })
  })
  app.post('/api/v1/fines', auth.authenticateToken, (req, res) => {
    const newFine = { ...req.body, ID: uuid() }
    dataset.insertOne(newFine).then((results) => {
      res.send({ results })
    })
  })
  app.patch('/api/v1/fines/:id', auth.authenticateToken, (req, res) => {
    dataset
      .updateOne(
        { ID: parseInt(req.params.id) },
        {
          $set: req.body,
        }
      )
      .then((results) => {
        res.send({ results })
      })
  })
  app.delete('/api/v1/fines/:id', auth.authenticateToken, (req, res) => {
    dataset.deleteOne({ ID: parseInt(req.params.id) }).then((results) => {
      res.send({ results })
    })
  })

  app.post('/api/v1/login', (req, res) => {
    users
      .find({
        username: req.body.username,
        password: req.body.password,
      })
      .toArray()
      .then((user) => {
        if (user.length === 0) {
          return res
            .status(400)
            .json({ message: 'Error. Wrong login or password' })
        }
        const token = auth.generateAccessToken(user)

        res.send({ access_token: token })
      })
  })

  app.use(middlewares.notFound)
  app.use(middlewares.errorHandler)
})

module.exports = app
