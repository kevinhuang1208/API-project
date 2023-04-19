// backend/routes/api/reviews.js

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Spot, Review, ReviewImage, User, SpotImage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



//get all reviews of current user
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        include: [
            {model: User, attributes: {exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']}},
            {model: Spot, attributes: {exclude: ['createdAt', 'updatedAt']}, include: {model: SpotImage}},
            {model: ReviewImage, attributes: {exclude: ['createdAt', 'updatedAt', 'reviewId']}}
        ],
        where: {
            userId: req.user.dataValues.id
        }
    })

    let Reviews = [];

    reviews.forEach(review => {
        Reviews.push(review.toJSON())
    })


    Reviews.forEach(data => {
        data.Spot.SpotImages.forEach(image => {
            data.Spot.previewImage = image.url
          })
          delete data.Spot.SpotImages
    })

    res.json({
        Reviews
    })
})

//add an image to a review based on review's id
router.post('/:id/images', requireAuth, async (req, res) => {
    const id = req.params.id
    const review = await Review.findByPk(id)

    const { url } = req.body

    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: id
        }
    })

    if(!review) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }

    if(review.dataValues.userId !== req.user.dataValues.id) {
        res.status(403)
        return res.json({
            message: 'Forbidden'
        })
    }

    const image = await ReviewImage.create({
      url,
      reviewId: review.dataValues.id
    }, {fields: ['id', 'url']})

    if(reviewImages.length > 10) {
        res.status(403)
        return res.json({
            message: "Maximum number of images for this resource was reached"
        })
    }

    res.json(image)
})


module.exports = router;
