const Fine = require('../controllers/controllerFines')
let router = require('express').Router()
router.use('/fines', Fine.findAllFines)

module.exports = router
