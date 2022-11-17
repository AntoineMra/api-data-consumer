const { uuid } = require('uuidv4')
exports.findAllFines = (req, res) => {
  dataset.find().forEach((err, results) => {
    res.status(200).json({ message: results })
  })
}

exports.findAFine = (req, res) => {
  const fine = database.dataset.find((fine) => fine.ID == req.params.id)
  res.json({
    message: fine,
  })
}

exports.addFine = (req, res) => {
  const newFine = { ...req.body, ID: uuid() }
  database.dataset.push(newFine)
  res.json({
    message: 'Le nouveau procès à bien été enregistrer',
  })
}

exports.updateAFine = (req, res) => {
  let fine = database.dataset.find((fine) => fine.ID == req.params.id)
  const changes = req.body
  const updatedFine = { ...fine, changes }
  database.dataset = database.dataset.map((fine) => {
    return fine.ID == req.params.id ? updatedFine : fine
  })
  res.json({
    message: updatedFine,
  })
}

exports.deleteAFine = (req, res) => {
  const deleteFine = database.dataset.find((fine) => fine.ID == req.params.id)
  const removedFine = database.dataset.filter((fine) => {
    return fine !== deleteFine
  })
  res.json({
    message: 'Le procès à bien été supprimer',
  })
}
