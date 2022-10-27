const app = require('./app')
const port = process.env.PORT || 5000

const MongoClient = require('mongodb').MongoClient;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`)
})


MongoClient.connect('mongodb://localhost:27017/api-data-consumer', (err, client) => {
  if (err) throw err

  const db = client.db('api-data-consumer');

  db.collection('courtcase').find().toArray((err, result) => {
    if (err) throw err

    console.log(result)
  })



})
