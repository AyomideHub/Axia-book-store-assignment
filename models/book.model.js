const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Please provide product name'],
		maxlength: [100, 'Name can not be more than 100 characters'],
	  },
	  
	description: {
		type: String,
		required: [true, 'Please provide product description'],
		maxlength: [1000, 'Description can not be more than 1000 characters'],
	  },
	
	  category: {
		type: String,
		required: [true, 'Please provide product category'],
	  },
	  createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	  }
	},
	{ timestamps: true}
)

module.exports = mongoose.model('Book', bookSchema)