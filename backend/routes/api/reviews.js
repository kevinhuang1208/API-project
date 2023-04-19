// backend/routes/api/reviews.js

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Spot, Review, ReviewImage, User, SpotImage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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


//editting a review
router.put('/:id', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body

    const reviewToEdit = await Review.findByPk(req.params.id)

    if(!reviewToEdit) {
      res.status(404)
      return res.json({
        message: "Spot couldn't be found"
      })
    }
    if(reviewToEdit.dataValues.userId !== req.user.dataValues.id) {
      res.status(403)
      return res.json({
        message: 'Forbidden'
      })
    }

    if(review) reviewToEdit.review = review
    if(stars)  reviewToEdit.stars = stars

    await reviewToEdit.save()
    res.json(reviewToEdit)
  })

module.exports = router;
