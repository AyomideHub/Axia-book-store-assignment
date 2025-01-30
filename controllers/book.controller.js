const Book = require("../models/book.model");
const { StatusCodes } = require("http-status-codes");

const createbook = async (req, res) => {
  const { title, description, category } = req.body;
  const userId = req.user.id;

  if (!title || !description || !category) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "All field are require" });
  }

  const book = await Book.findOne({ title });

  if (book) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "Book Already exist" });
  }

  const newbook = await Book.create({
    title,
    description,
    category,
    createdBy: userId,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "registration sucessfull",
    data: { ...newbook._doc },
  });
};

const deletebook = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id;

  const book = await Book.findOne({ _id: bookId });

  if (!book) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "No book with such ID" });
  }

  if (book.createdBy.toString() !== userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        success: false,
        msg: "Unauthorized request, you dont have permission to deleted this book",
      });
  }

  const deletedBook = await Book.findOneAndDelete({ _id: bookId });

  if (deletedBook) {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "Book deleted sucessfully" });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: "Server Error" });
  }
};

const updatebook = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id;

  const book = await Book.findOne({ _id: bookId });

  if (!book) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "No book with such ID" });
  }

  //console.log(book.createdBy.toString())
  //console.log(userId)

  if (book.createdBy.toString() !== userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        success: false,
        msg: "Unauthorized request, you dont have permission to edit this book",
      });
  }

  const updatedBook = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (updatedBook) {
    return res.status(StatusCodes.OK).json({
      success: true,
      msg: "Book updated sucessfully",
      data: { updatedBook },
    });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: "Server Error" });
  }
};

const getBooks = async (req, res) => {
  const books = await find({});
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "sucessfully", data: { books } });
};

module.exports = { createbook, deletebook, updatebook, getBooks };
