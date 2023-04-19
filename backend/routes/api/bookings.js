// backend/routes/api/bookings.js

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Spot, Review, ReviewImage, User, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');




module.exports = router;
