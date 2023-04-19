// backend/routes/api/bookings.js

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Spot, Review, ReviewImage, User, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//get all of current user's bookings
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        include: [
            {model: Spot, attributes: {exclude: ['createdAt', 'updatedAt']}, include: {model: SpotImage}},
        ],
        where: {
            userId: req.user.dataValues.id
        }
    })

    let Bookings = [];

    bookings.forEach(booking => {
        Bookings.push(booking.toJSON())
    })


    Bookings.forEach(data => {
        data.Spot.SpotImages.forEach(image => {
            data.Spot.previewImage = image.url
          })
          delete data.Spot.SpotImages
    })

    res.json({
        Bookings
    })

})


module.exports = router;
