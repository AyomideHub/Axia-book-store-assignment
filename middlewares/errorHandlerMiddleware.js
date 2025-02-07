const { StatusCodes } = require("http-status-codes")

const errorHandlerMiddleware = async (err, req, res, next) => {
	{
		console.log(err)
		res.status(StatusCodes.BAD_REQUEST).json( err)
	}
}

module.exports = { errorHandlerMiddleware } 