exports.findAllClient = (req, res) => {
  Client.findAll().then((data) => {
    res.send(data)
  })
}
