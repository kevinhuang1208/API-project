// backend/routes/api/spots.js

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Spot, Review, SpotImage, User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

router.post('/', requireAuth, validateSpot, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const spot = await Spot.create({
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


    res.json(spot)
})

router.get('/', async (req, res) => {

    const Spots = await Spot.findAll({
        include: {
            model: Review,
            attributes: ['stars']
        }
    })

    res.json({
        Spots
    })
})


module.exports = router;
