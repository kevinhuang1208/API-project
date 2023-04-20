// backend/routes/api/spots.js

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { UniqueConstraintError } = require('sequelize');
const spot = require('../../db/models/spot');
const { Op } = require('sequelize');

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

  const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
    .isNumeric()
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];

  const validateQuery = [
    check('page')
      .isInt({gt: 0})
      .withMessage('Page must be greater than or equal to 1'),
    check('size')
      .isInt({gt: 0})
      .withMessage('Page must be greater than or equal to 1'),
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

//get all reviews by spot id
router.get('/:id/reviews', async (req, res) => {
  const id = req.params.id
  const spot = await Spot.findByPk(id)
  const Reviews = await Review.findAll({
    include: [
      {model: User, attributes: {exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']}},
      {model: ReviewImage, attributes: {exclude: ['reviewId', 'createdAt', 'updatedAt']}}
    ],
    where: {
      spotId: id
    }
  })

  if(!spot) {
    res.status(404)
    return res.json({
        message: "Spot couldn't be found"
    })
} else {

  return res.json({Reviews})
  }
})

router.get('/:id/bookings', requireAuth, async (req, res) => {

  const spot = await Spot.findByPk(req.params.id)

  if(!spot) {
    res.status(404)
    return res.json({
        message: "Spot couldn't be found"
    })
  }
  console.log(req.user.dataValues.id)
  console.log(spot.ownerId)
  if(req.user.dataValues.id !== spot.ownerId) {
    const Bookings = await Booking.findAll({
      where: {
        spotId: req.params.id
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })
    return res.json({Bookings})
  }

  if(req.user.dataValues.id === spot.ownerId) {
    const Bookings = await Booking.findAll({
      where: {
        spotId: req.params.id
      },
      include: {
        model: User,
        attributes: {exclude: ['createdAt', 'updatedAt', 'username', 'hashedPassword', 'email']}
      }
    })
    return res.json({Bookings})
  }

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
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }
  if(spot.dataValues.ownerId !== req.user.dataValues.id) {
    res.status(403)
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
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  if(spot.dataValues.ownerId !== req.user.dataValues.id) {
    res.status(403)
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

//creating a review for a spot based on the spot's id
router.post('/:id/reviews', requireAuth, validateReview, async (req, res) => {
  // const id = req.params.id
  const spot = await Spot.findByPk(req.params.id)
  const reviews = await Review.findAll({
    where: {
      spotId: req.params.id,
      userId: req.user.dataValues.id
    }
  })

  const {review, stars} = req.body


  if(!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  if(reviews[0]) {
    res.status(500)
    return res.json({
      message: "User already has a review for this spot"
    })
  }

  const newReview = await Review.create({
    userId: req.user.dataValues.id,
    spotId: spot.id,
    review,
    stars
  })

  res.json(newReview)
})

//creating a booking from a spot based on spotid
router.post('/:id/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.id)

  const bookings = await Booking.findAll({
    where: {
      spotId: req.params.id
    }
  })

  const {startDate, endDate} = req.body

  const theStart = new Date(startDate)
  const theEnd = new Date(endDate)
  const theStartTime = theStart.getTime()
  const theEndTime = theEnd.getTime()


  if(!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found"
    })
  }


  if(spot.dataValues.ownerId === req.user.dataValues.id) {
    res.status(403)
    return res.json({
      message: 'You cannot book your own spot!'
    })
  }

  if(theEndTime <= theStartTime) {
    res.status(400)
    return res.json({
      message: "Bad request",
      errors: {
        endDate: "endDate cannot be on or before startDate"
      }
    })
  }

  for(let i = 0; i < bookings.length; i++) {
    let eachBooking = bookings[i]
    let startDate = new Date(eachBooking.startDate)
    let endDate = new Date(eachBooking.endDate)
    let startDateTime = startDate.getTime()
    let endDateTime = endDate.getTime()

    if((startDateTime >= theStartTime && startDateTime <= theEndTime) || (endDateTime >= theStartTime && endDateTime <= theEndTime)) {
      res.status(403)
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an exists booking"
        }
      })
    }
  }

  const newBooking = await Booking.create({
    userId: req.user.dataValues.id,
    spotId: spot.id,
    startDate,
    endDate
  })

  res.json(newBooking)


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
    }, {fields: ['id', 'url', 'preview']})

    if(spot.dataValues.ownerId !== req.user.dataValues.id) {
      res.status(403)
      return res.json({
        message: 'Forbidden'
      })
    }

    if(!spot) {
      res.status(404)
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

  let { page, size } = req.query

  if(!page) page = 1
  if(!size) size = 20

  page = parseInt(page);
  size = parseInt(size);

  if(page < 1) {
    res.status(400)
    return res.json({
      message: "Bad Request",
      errors: {
        page: "Page must be greater than or equal to 1"
      }
    })
  }
  if(size < 1) {
    res.status(400)
    return res.json({
     message: "Bad Request",
     errors: {
        size: "Page must be greater than or equal to 1"
      }
    })
  }

  if(page > 10) page = 10;
  if(size > 20) size = 20;

  const pagination = {};
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
      }

  let where = {};

  if(req.query.minLat && (isNaN(parseInt(req.query.minLat)))) {
    res.status(400)
    return res.json({
      message: "Bad Request",
      errors: {
        minLat: "Minimum latitude is invalid"
      }
    })
  }

  if(req.query.maxLat && (isNaN(parseInt(req.query.maxLat)))) {
    res.status(400)
    return res.json({
      message: "Bad Request",
      errors: {
        maxLat: "Maximum latitude is invalid"
      }
    })
  }

  if(req.query.minLng && (isNaN(parseInt(req.query.minLng)))) {
    res.status(400)
    return res.json({
      message: "Bad Request",
      errors: {
        minLng: "Minimum longitude is invalid"
      }
    })
  }

  if(req.query.maxLng && (isNaN(parseInt(req.query.maxLng)))) {
    res.status(400)
    return res.json({
      message: "Bad Request",
      errors: {
        maxLng: "Maximum longitude is invalid"
      }
    })
  }

  if(req.query.minPrice && req.query.minPrice < 0) {
    res.status(400)
    return res.json({
      message: "Bad Request",
      errors: {
        minPrice: "Minimum price must be greater than or equal to 0"
      }
    })
  }

  if(req.query.maxPrice && req.query.maxPrice < 0) {
    res.status(400)
    return res.json({
      message: "Bad Request",
      errors: {
        minPrice: "Maximum price must be greater than or equal to 0"
      }
    })
  }

  if (req.query.minLat) {
    where.lat = req.query.minLat;
    where.lat = { [Op.gte]: `${req.query.minLat}`}
  }
  if (req.query.maxLat) {
    where.lat = req.query.maxLat;
    where.lat = { [Op.lte]: `${req.query.maxLat}`}
  }
  if (req.query.minLng) {
    where.lng = req.query.minLng;
    where.lng = { [Op.gte]: `${req.query.minLng}`}
  }
  if (req.query.maxLng) {
    where.lng = req.query.maxLng;
    where.lng = { [Op.lte]: `${req.query.maxLng}`}
  }
  if (req.query.minPrice && (req.query.minPrice >= 0)) {
    where.price = req.query.minPrice;
    where.price = { [Op.gte]: `${req.query.minPrice}`}
  }
  if (req.query.maxPrice && (req.query.maxPrice >= 0)) {
    where.price = req.query.maxPrice;
    where.price = { [Op.lte]: `${req.query.maxPrice}`}
  }



  const spots = await Spot.findAll({
    include: [
      {model: Review},
      {model: SpotImage}
    ],
    where,
    ...pagination
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
      Spots,
      page,
      size
    })


  })


module.exports = router;
