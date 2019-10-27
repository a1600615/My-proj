const express = require('express');
const router = express.Router();// is a given function by express, helps us to make http request 
const uasRoute = require('./uas');
const programRoute = require('./program');
const studyappRoute = require('./studyapp');

router.use('/uas', uasRoute);
router.use('/program', programRoute);
router.use('/studyapp', studyappRoute);

module.exports = router;
