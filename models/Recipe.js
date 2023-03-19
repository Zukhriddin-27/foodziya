const mongoose = require('mongoose')
const Joi = require('joi')
const resipesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },

  category: {
    type: String,
    enum: [
      'Quyuq',
      'Suyuq',
      'Kabob',
      'Salat',
      'Pishiriq',
      'Non',
      'Shirinlik',
      'Ichimlik',
    ],
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
})
// resipesSchema.index({ name: 'text', description: 'text' })
//Wideng card indexing
resipesSchema.index({ '$**': 'text' })
function validateRecipe(detail) {
  const schema = new Joi.object({
    name: Joi.string().required().min(3),
    description: Joi.string().required().max(4500).min(3),
    email: Joi.string().required().min(3),
    ingredients: Joi.array().required().min(3),
    category: Joi.string().required(),
    picture: Joi.string().required(),
    link: Joi.string().required(),
  })
  return schema.validate(detail)
}
const Recipe = mongoose.model('Recipe', resipesSchema)

exports.Recipe = Recipe
exports.validate = validateRecipe
