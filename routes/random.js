const { Router } = require('express')
const router = Router()
const { Recipe, validate } = require('../models/Recipe')

router.get('/', async (req, res) => {
  let count = await Recipe.find().countDocuments()
  let random = Math.floor(Math.random() * count)
  await Recipe.findOne()
    .skip(random)
    .exec()
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    })
})

module.exports = router
