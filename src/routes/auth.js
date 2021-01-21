const express = require('express');
const User = require('../models/user');
const router = express.Router();
const isLogin = require('../middleware/isLogin');
router.get('/prot', isLogin, (req, res) => {
	res.send('hello');
});

router.post('/signup', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(422).send({ error: 'provide all fields' });
		}
		const user = new User({ name, email, password });
		await user.save();
		const token = user.generateAuthToken();
		res.cookie('ig-clone', token);
		res.send(user);
		user.password = undefined;
		res.send(user);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.post('/signin', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		user.password = undefined;
		const token = user.generateAuthToken();
		res.cookie('igClone', token);
		res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;
