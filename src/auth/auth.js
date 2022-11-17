const jwt = require('jsonwebtoken')

const key =
  '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'

function generateAccessToken(user) {
  return jwt.sign(user[0], key, { expiresIn: '1800s' })
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  console.log(token == null)
  if (token == null) return res.sendStatus(401)
  console.log(key)

  jwt.verify(token, key, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

module.exports = { generateAccessToken, authenticateToken }
