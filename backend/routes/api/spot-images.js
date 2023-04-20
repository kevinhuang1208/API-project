// backend/routes/api/spot-images.js

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Spot, Review, ReviewImage, User, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.delete('/:id', requireAuth, async (req, res) => {

    const image = await SpotImage.findByPk(req.params.id,
        {
            include: {model: Spot}
        })


    if(!image) {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }

    if(image.Spot.ownerId !== req.user.dataValues.id) {
        res.status(403)
        return res.json({
            message: 'Forbidden'
        })
    }

    if(image) {
        await image.destroy()
        res.json({
            message: "Successfully deleted"
        })
    }


})




module.exports = router;
