const mongoose = require('mongoose')
const { MONGO_URI } = require('./config/key')

const db = () => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (error) {
    handleError(error)
  }
}

exports.db = db
