const { Router } = require('express')
const router = Router()
const { Category, validation } = require('../models/Category.js')

router.post('/', async (req, res) => {
  const { error } = validation(req.body)
  if (error) {
    return res.status(404).json({ error: error.details[0].message })
  }
  let newCategory = await new Category({
    name: req.body.name,
    image: req.body.image,
  })
  newCategory.save()
  res.status(201).json(newCategory)
})

router.get('/', async (req, res) => {
  Category.find()
    .limit(5)
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
    })
})
router.get('/all', async (req, res) => {
  Category.find()
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
    })
})
// router.get('/:id', async (req, res) => {
//   try {
//     const categoryId = req.params.id

//     await Recipe.find({ category: categoryId })

//       .then((result) => {
//         res.json(result)
//       })

//       .catch((err) => {
//         console.log(err)
//       })
//   } catch (error) {
//     console.log(error)
//   }
// })
module.exports = router
