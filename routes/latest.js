const { Router } = require('express')
const router = Router()
const { Recipe, validate } = require('../models/Recipe')

router.get('/', async (req, res) => {
  try {
    const limitNumber = 12
    await Recipe.find({})
      .sort({ _id: -1 })
      .limit(limitNumber)
      .then((result) => res.json(result))
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    return res.status(422).json({ error: error })
  }
})

module.exports = router
