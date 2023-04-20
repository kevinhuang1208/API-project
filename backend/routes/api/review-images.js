// backend/routes/api/review-images.js

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Review, ReviewImage } = require('../../db/models');

const router = express.Router();

router.delete('/:id', requireAuth, async (req, res) => {

    const image = await ReviewImage.findByPk(req.params.id,
        {
            include: {model: Review}
        })


    if(!image) {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }

    if(image.Review.userId !== req.user.dataValues.id) {
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
