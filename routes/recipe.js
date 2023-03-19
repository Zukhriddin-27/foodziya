const { Router } = require('express')
const router = Router()
const { Recipe, validate } = require('../models/Recipe')
router.get('/', async (req, res) => {
  await Recipe.find().then((result) => {
    res.json(result)
  })
})
router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) {
    return res.status(422).json({ error: error.details[0].message })
  }
  const { name, description, email, ingredients, category, link, picture } =
    req.body
  try {
    const newRecipe = new Recipe({
      name: name,
      email: email,
      description: description,
      ingredients: ingredients,
      category: category,
      picture: picture,
      link: link,
    })
    await newRecipe
      .save()
      .then((result) => {
        res.json({ newRecipe: result })
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  const recipeId = req.params.id
  await Recipe.findById(recipeId).then((result) => {
    res.json(result)
  })
})

module.exports = router
