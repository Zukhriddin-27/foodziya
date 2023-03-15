const mongoose = require('mongoose')
const Joi = require('joi')
const schemaPost = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
  createDate: {
    type: Date,
    default: new Date(),
  },
})

function validatePost(detail) {
  const schema = new Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().required().email(),
    post: Joi.string().required().min(5).max(200),
  })
  return schema.validate(detail)
}

const Post = mongoose.model('Post', schemaPost)

exports.Post = Post
exports.validate = validatePost
