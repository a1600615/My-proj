const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('this is studyapp');
	//  '/' this will actually take us to localhost:3000/api/program
});

module.exports = router;
