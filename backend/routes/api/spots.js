// backend/routes/api/spots.js

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Spot, Review, SpotImage, User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { UniqueConstraintError } = require('sequelize');
const spot = require('../../db/models/spot');

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
    //   .isLength({ min: 4 })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .isDecimal()
      .withMessage('Latitude is not valid'),
    check('lng')
      .isDecimal()
      .withMessage('Longitude is not valid'),
    check('name')
      .isLength({max: 49})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({checkFalsy: true})
      .withMessage('Description is required'),
    check('price')
      .exists({checkFalsy: true})
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];


router.get('/current', requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    include: [
      {model: Review},
      {model: SpotImage}
    ],
    where: {
      id: req.user.dataValues.id
    }
  })

  let Spots = [];

  spots.forEach(spot => {
    Spots.push(spot.toJSON())
  })

  Spots.forEach(spot => {
    let sum = 0
    for(let i = 0; i < spot.Reviews.length; i++) {
      sum += spot.Reviews[i].stars
    }
    spot.avgRating = sum / spot.Reviews.length
    delete spot.Reviews
  })

  Spots.forEach(spot => {
    spot.SpotImages.forEach(image => {
      spot.previewImage = image.url
    })
    delete spot.SpotImages
  })

  res.json({
      Spots
    })

})

//getting a spot by id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const spot = await Spot.findByPk(id, {
        include: [
        {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    ]
    })

    const numReviews = await Review.findAll({
        where: {
            spotId: id
        }
    })

    let count = 0;

    for(let perStar of numReviews) {
        count += perStar.stars
    }

    const data = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: numReviews.length,
        avgStarRating: count / numReviews.length,
        SpotImages: spot.SpotImages,
        Owner: spot.User

    }


    if(!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    } else {

    return res.json(data)
    }
})

//editting a spot
router.put('/:id', requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body

  const spot = await Spot.findByPk(req.params.id)

  if(!spot) {
    return res.json({
      message: "Spot couldn't be found"
    })
  }
  if(spot.dataValues.ownerId !== req.user.dataValues.id) {
    return res.json({
      message: 'Forbidden'
    })
  }

  if(address) spot.address = address
  if(city)  spot.city = city
  if(state) spot.state = state
  if(country) spot.country = country
  if(lat) spot.lat = lat
  if(lng) spot.lng = lng
  if(name) spot.name = name
  if(description) spot.description = description
  if(price) spot.price = price

  await spot.save()
  res.json(spot)
})

//deleting a spot
router.delete('/:id', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.id)

  if(!spot) {
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  if(spot.dataValues.ownerId !== req.user.dataValues.id) {
    return res.json({
      message: 'Forbidden'
    })
  }
  if(spot) {
    await spot.destroy()
    res.json({
      message: "Successfully deleted"
    })
  }
})

//adding an image to a Spot based on Spot's id
router.post('/:id/images', requireAuth, async (req, res) => {
    const idd = req.params.id
    const spot = await Spot.findByPk(idd)

    const { url, preview } = req.body

    const image = await SpotImage.create({
      url,
      preview,
      spotId: spot.dataValues.id
    })

    if(spot.dataValues.ownerId !== req.user.dataValues.id) {
      return res.json({
        message: 'Forbidden'
      })
    }

    if(!spot) {
      return res.json({
        message: "Spot couldn't be found"
      })
    }
    res.json(image)
})


//creating a spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    // const theUser = await User.findByPk(req.params.id)

    const spot = await Spot.build({
        ownerId: req.user.dataValues.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    spot.validate()
    await spot.save()


    res.json(spot)
})


//getting all spots
router.get('/', async (req, res) => {

  const spots = await Spot.findAll({
    include: [
      {model: Review},
      {model: SpotImage}
    ]
  })

  let Spots = [];

  spots.forEach(spot => {
    Spots.push(spot.toJSON())
  })

  Spots.forEach(spot => {
    let sum = 0
    for(let i = 0; i < spot.Reviews.length; i++) {
      sum += spot.Reviews[i].stars
    }
    spot.avgRating = sum / spot.Reviews.length
    delete spot.Reviews
  })

  Spots.forEach(spot => {
    spot.SpotImages.forEach(image => {
      spot.previewImage = image.url
    })
    delete spot.SpotImages
  })

  res.json({
      Spots
    })


  })


module.exports = router;
