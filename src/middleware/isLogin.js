const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isLogin = async (req, res, next) => {
	try {
		const token =
			req.cookies.igClone || req.header('Authorization').replace('Bearer ', '');
		if (!token) {
			throw new Error('Please authenticate');
		}
		const decoded = jwt.verify(token, 'icandoit');
		const user = await User.findById(decoded._id);
		if (!user) {
			throw new Error('please authenticate2');
		}
		req.user = user;
		next();
	} catch (e) {
		res.status(401).send({ error: 'Please authenticate1' });
	}
};

module.exports = isLogin;
