require('dotenv').config()
const express = require('express')
const connectdb = require('./db/connectdb')
const cookieParser = require('cookie-parser')
const AuthRoute = require('./routes/Auth.Route')
const BookRoute = require('./routes/book.route')


const app = express()

// middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// routes
app.get('/', (req, res) => {
	res.status(200).send('<h1> Hello world </h1>')
})

app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/book', BookRoute)



const port = process.env.PORT || 5000

const start = async () => {
	try {
		await connectdb(process.env.MONGO_LOCAL)
		app.listen(port, () => {
			console.log('server is running');
		})
	} catch (error) {
		console.log(error);
		
	}
}

start()