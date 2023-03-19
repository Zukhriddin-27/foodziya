const { Router } = require('express')
const router = Router()
const { Recipe, validate } = require('../models/Recipe')

router.post('/', async (req, res) => {
  let searchTerm = req.body.query
  Recipe.find({
    $text: { $search: searchTerm, $diacriticSensitive: true },
  })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
