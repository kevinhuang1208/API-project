// backend/routes/api/spots.js

const express = require('express');

const { Spot, Review, SpotImage, User } = require('../../db/models');

const router = express.Router();


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
