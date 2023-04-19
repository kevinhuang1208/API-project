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

//edit a booking
router.put('/:id', requireAuth, async (req, res) => {

    const { startDate, endDate } = req.body

    const bookingToEdit = await Booking.findByPk(req.params.id)

    const bookings = await Booking.findAll({
        where: {
            spotId: bookingToEdit.spotId
        }
      })


    const theStart = new Date(startDate)
    const theEnd = new Date(endDate)
    const theStartTime = theStart.getTime()
    const theEndTime = theEnd.getTime()


    if(!bookingToEdit) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })
    }


    if(bookingToEdit.dataValues.userId !== req.user.dataValues.id) {
        res.status(403)
        return res.json({
            message: 'Forbidden'
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

    const currentDate = new Date()
    let currentTime = currentDate.getTime()
    let bookingsEndDate = bookingToEdit.endDate
    let bookingsEndDateString = new Date(bookingsEndDate)
    let bookingsEndTime = bookingsEndDateString.getTime()

    if(bookingsEndTime < currentTime) {
        res.status(403)
        return res.json({
            message: "Past bookings can't be modified"
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

    if(startDate) bookingToEdit.startDate = startDate
    if(endDate)  bookingToEdit.endDate = endDate

    await bookingToEdit.save()
    res.json(bookingToEdit)

})


module.exports = router;
