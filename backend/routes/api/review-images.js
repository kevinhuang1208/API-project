// backend/routes/api/review-images.js

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Review, ReviewImage } = require('../../db/models');

const router = express.Router();



module.exports = router;
