const { Schema, model } = require('mongoose')

const resipesSchema = new Schema({
  name: {
    type: String,
    required: 'this fild is required',
  },
  description: {
    type: String,
    required: 'this fild is required',
  },
  email: {
    type: String,
    required: 'this fild is required',
  },
  ingredients: {
    type: Array,
    required: 'this fild is required',
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
    required: 'this fild is required',
  },
  image: {
    type: String,
    required: 'this fild is required',
  },
  link: {
    type: String,
    required: 'this fild is required',
  },
})

resipesSchema.index({ name: 'text', description: 'text' })
//Wideng card indexing
// resipesSchema.index({ '$**': 'text' })

model('Recipe', resipesSchema)
