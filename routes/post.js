const { Router } = require('express')
const router = Router()
const { Post, validate } = require('./../models/Post')

router.get('/', async (req, res) => {
  await Post.find()
    .then((result) => res.json(result))
    .catch((e) => {
      res.status(400).send(e)
    })
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  const { name, post, email } = req.body
  if (error) {
    return res.status(500).json({ error: error.details[0].message })
  }
  const newPost = new Post({
    name: name,
    email: email,
    post: post,
  })
  newPost
    .save()
    .then((result) => {
      res.json({ newPost: result })
    })
    .catch((error) => {
      console.log(error)
    })
})
module.exports = router
