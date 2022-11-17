const { MongoClient } = require('mongodb')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.qigutbk.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
client.connect().then(() => {
  exports.dataset = client.db('test').collection('dataset')
  console.log(client.db('test').collection('users').find())

  exports.users = client.db('test').collection('users')

  client.close()
})
