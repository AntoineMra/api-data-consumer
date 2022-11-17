const Auth = require('../controllers/controllerAuth')
let router = require('express').Router()
router.use('/fines', Fine.findAllFines)
router.use('/fine/:id', Fine.findAFine)

module.exports = router
