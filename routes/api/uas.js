const express = require('express');
const router = express.Router();
const db = require('../../database');

router.get('/', (req, res) => {
	db('uas')
		.select()
		.then((data) => {
			res.send(data);
		});
});

router.get('/:id', (req, res) => {
	db('uas')
		.where({ id: req.params.id })
		.then((data) => {
			res.send(data);
		});
});

router.put('/:id', function(req, res) {
	db('uas')
		.where({ id: req.params.id })
		.update(req.body)
		.returning('*')
		.then(function(data) {
			res.send(data);
		});
});
router.post('/', function(req, res) {
	db.insert(req.body)
		.into('uas')
		.then(function(data) {
			res.send(data);
		});
});

router.delete('/:id', function(req, res) {
	db('uas')
		.where({ id: req.params.id })
		.del()
		.then(res.send(`${req.params.id} deleted from the database`));
});

module.exports = router;
