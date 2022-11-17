const jwt = require('jsonwebtoken')
const key = 'PRIVATE_KEY'

const { MongoClient } = require('mongodb')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.qigutbk.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
client.connect().then(() => {
  exports.users = client.db('test').collection('users')

  exports.login = (req, res) => {
    const user = dataset.users.find(
      (u) =>
        u.username === req.body.username && u.password === req.body.password
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
})
