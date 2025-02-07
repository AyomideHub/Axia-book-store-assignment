const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = mongoose.Schema({
	
	username: {
		type: String,
		required:[true, 'please provide your username'],
		unique: true,
	},
	email:{
		type: String,
		required:[true, 'please provide your email'],
		unique: true,
		validate:{
			validator: validator.isEmail,
      		message: 'Please provide valid email',
		}
		
	},
	password:{
		type: String,
		required:[true, 'please provide your password'],
		minlength: 8
	},
	
	
}, {timestamps: true})


module.exports = mongoose.model('User', UserSchema)