module.exports = (app) => {
  const Test = require('../controller/controllerTest')
  let router = require('express').Router()

  router.get('/test', Test.findAllTest)
  app.use('/api/v1', router)
}
