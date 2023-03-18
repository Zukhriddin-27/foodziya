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
  console.log(req.body)
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

router.get('/random', async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments()
    let random = Math.floor(Math.random() * count)
    await Recipe.findOne()
      .skip(random)
      .exec()
      .then((result) => {
        res.json(result)
      })
  } catch (error) {}
})
router.get('/latest', async (req, res) => {
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

router.post('/search', async (req, res) => {
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
