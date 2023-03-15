const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')
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

// async function insertDymmyCategory() {
//   try {
//     await Category.insertMany([
//       {
//         name: 'Quyuq taom',
//         image: 'osh.jpg',
//       },
//       {
//         name: 'Suyuq taom',
//         image: 'shurva.jpg',
//       },
//       {
//         name: 'Kabob',
//         image: 'shashlik.png',
//       },
//       {
//         name: 'Salat',
//         image: 'https://res.cloudinary.com/dus2bqcc6/image/upload/v1659985678/caption_vzxb7c.jpg',
//       },
//       {
//         name: 'Pishiriq',
//         image: 'https://res.cloudinary.com/dus2bqcc6/image/upload/v1659813167/holvata_ftu9xa.png',
//       },
//       {
//         name: 'Non',
//         image: 'https://res.cloudinary.com/dus2bqcc6/image/upload/v1659985679/non_hp0wfr.jpg',
//       },
//       {
//         name: 'Shirinlik',
//         image: 'https://res.cloudinary.com/dus2bqcc6/image/upload/v1659985679/cake_vrvovo.jpg',
//       },
//       {
//         name: 'Ichimlik',
//         image: 'https://res.cloudinary.com/dus2bqcc6/image/upload/v1659985678/ayron_fxek6m.jpg',
//       },
//     ])
//   } catch (error) {
//     console.log('err, ' + error)
//   }
// }
