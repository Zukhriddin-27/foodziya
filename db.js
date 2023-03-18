const mongoose = require('mongoose')
const { MONGO_URI } = require('./config/key')

const db = () => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('Connected to MongoDB database.')
    })
  } catch (error) {
    console.log(error)
  }
}

exports.db = db
