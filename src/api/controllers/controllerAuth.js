const dataset = require('../../../database/mongo')
const jwt = require('jsonwebtoken')

const key = 'PRIVATE_KEY'

exports.login = (req, res) => {
  const user = dataset.users.find(
    (u) => u.username === req.body.username && u.password === req.body.password
  )
  if (!user) {
    return res.status(400).json({ message: 'Error. Wrong login or password' })
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    key,
    { expiresIn: '3 hours' }
  )

  return res.json({ access_token: token })
}
