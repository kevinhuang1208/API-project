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


module.exports = router;
