const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		validate(value) {
			if (!validator.isEmail(value)) throw new Error('Not a valid email.');
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error(' Your password cannot contain "password"');
			}
			if (value.length < 6) {
				throw new Error('Your password must be of atleast 7 characters');
			}
		},
	},
	// resetToken: String,
	// expireToken: Date,
	// pic: {
	// 	type: String,
	// 	default:
	// 		'https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png',
	// },
	// followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	// following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('Error logging in');
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('username or password donot match');
	}
	return user;
};

userSchema.methods.generateAuthToken = function () {
	return jwt.sign({ _id: this._id.toString() }, 'icandoit', {
		expiresIn: '15d',
	});
};

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
