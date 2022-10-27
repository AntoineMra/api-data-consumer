let database = require('../../../database/dataset.json')
const { uuid } = require('uuidv4')

exports.findAllFines = (req, res) => {
  res.json({
    message: database,
  })
}

exports.findAFine = (req, res) => {
  const fine = database.find((fine) => fine.ID == req.params.id)
  res.json({
    message: fine,
  })
}

exports.addFine = (req, res) => {
  const newFine = { ...req.body, ID: uuid() }
  database.push(newFine)
  res.json({
    message: 'Le nouveau procès à bien été enregistrer',
  })
}

exports.updateAFine = (req, res) => {
  let fine = database.find((fine) => fine.ID == req.params.id)
  const changes = req.body
  const updatedFine = { ...fine, changes }
  console.log(updatedFine)
  database = database.map((fine) => {
    return fine.ID == req.params.id ? updatedFine : fine
  })
  res.json({
    message: updatedFine,
  })
}

exports.deleteAFine = (req, res) => {
  const deleteFine = database.find((fine) => fine.ID == req.params.id)
  console.log(database.length)
  const removedFine = database.filter((fine) => {
    return fine !== deleteFine
  })
  res.json({
    message: 'Le procès à bien été supprimer',
  })
  console.log(database.length)
}
