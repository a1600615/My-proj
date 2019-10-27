const express = require('express');
const router = express.Router();
const db = require('../../database');

router.get('/', (req, res) => {
	db('program')
		.select()
		.then((data) => {
			res.send(data);
		});
});

router.get('/:id', (req, res) => {
	db('program')
		.where({ id: req.params.id })
		.first()
		.then((data) => {
			res.send(data);
		});
});

router.post('/', function(req, res) {
	db.insert(req.body)
		.into('program')
		.then(function(data) {
			res.send(data);
		});
});

router.delete('/:id', function(req, res) {
	db('program')
		.where({ id: req.params.id })
		.del()
		.then(res.send(`${req.params.id} deleted from the database`));
});

router.put('/:id', function(req, res) {
	db('program')
		.where({ id: req.params.id })
		.update(req.body)
		.returning('*')
		.then(function(data) {
			res.send(data);
		});
});
router.get('/search/:keyword', function(req, res) {
	let keyword = req.params.keyword;

	/*
	  knex.select('*').from('users').whereNull('last_name')
	  .union(function() {
		  this.select('*').from('users').whereNull('first_name')
	  })
	*/

	if (keyword && keyword.length > 0) {
		db('program')
			.from('program')
			.select('*')
			.where('name', 'like', `%${keyword || keyword2}%`)
			.andWhere('degree', 'like', `%${keyword || keyword2}%`)
			.union(function() {
				this.select('*')
					.from('program')
					.where('name', 'like', `%${keyword || keyword2}%`)
					.andWhereNot('degree', 'like', `%${keyword || keyword2}%`);
			})
			.then((data) => {
				res
					.status(200)
					.send(data)
					.end();
			})
			.catch((error) => {
				if (error.errno === 1146) {
					res
						.status(551)
						.send('Database table not created. DB error: ' + error.errno)
						.end();
				} else {
					res
						.status(500)
						.send('Database error something: ' + error.errno)
						.end();
				}
			});
	} else {
		res
			.status(400)
			.send('Missing keyword, keyword is: ' + keyword)
			.end();
	}
});

module.exports = router;
