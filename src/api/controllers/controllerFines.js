const database = require('../../../database/dataset.json')

exports.findAllFines = (req, res) => {
  res.json({
    message: database,
  })
}
