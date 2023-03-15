const mongoose = require('mongoose')
const Joi = require('joi')
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'this fild is required',
  },
  image: {
    type: String,
    required: 'This fild is required',
  },
})

function validateCategory(details) {
  const schema = new Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
  })

  return schema.validate(details)
}

const Category = mongoose.model('Category', categorySchema)

exports.Category = Category
exports.validation = validateCategory
