const { Router } = require('express')
const mongoose = require('mongoose')
const router = Router()
const { Recipe, validate } = require('../models/Recipe')
const multer = require('multer')
const crypto = require('crypto')
const { GridFsStorage } = require('multer-gridfs-storage')
const { MONGO_URI } = require('../config/key')

const { db } = require('../db')

const conn = mongoose.connection
conn.once =
  ('open',
  () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    })
  })
const storage = new GridFsStorage({
  url: MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        }
        resolve(fileInfo)
      })
    })
  },
})
const uploads = multer({
  storage,
})

router.get(`/`, async (req, res) => {
  if (!gfs) {
    const error = 'GSf xato'
    res.send(error)
    process.exit(0)
  }
  gfs.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.render('index', {
        files: false,
      })
    } else {
      const f = files.map((file) => {
        if (
          file.contentType === 'image/png' ||
          file.contentType === 'image/jpeg'
        ) {
          file.isImage = true
        } else {
          file.isImage = false
        }
        return file
      })
      res.status(201).send({ file: f })
    }
  })
  await Recipe.find()
    .then((result) => {
      res.json(result)
    })
    .catch((e) => {
      console.log(e)
    })
})

router.post('/', (req, res) => {
  const { error } = validate(req.body)
  if (error) {
    return res.status(422).json({ error: error.details[0].message })
  }
  const { name, description, email, ingredients, category, link, image } =
    req.body
  try {
    const newRecipe = new Recipe({
      name: name,
      email: email,
      description: description,
      ingredients: ingredients,
      category: category,
      image: image,
      link: link,
    })
    newRecipe
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
