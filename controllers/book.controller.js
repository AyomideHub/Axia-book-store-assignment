const Book = require("../models/book.model");
const { StatusCodes } = require("http-status-codes");

const createbook = async (req, res) => {
  const { title, decription, category } = req.body;

  if (!title || !decription || !category) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "All field are require" });
  }

  let book = await User.findOne({ title });

  if (book) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "Book Already exist" });
  }

  const newbook = await Book.create({ title, decription, category });

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "registration sucessfull",
    data: { ...newbook._doc },
  });
};

const deletebook = async (req, res) => {
  const bookId  = req.params.id;
  const userId = req.user;

  const book = await findOne({ _id: bookId });

  if (!book) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "No book with such ID" });
  }

  if (book.createdBy !== userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, msg: "Unauthorized request" });
  }

  const deletedBook = await findOneAndDelete({ _id: bookId });

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
  const bookId = req.param.id;
  const userId = req.user.id;

  const book = await findOne({ _id: bookId });

  if (!book) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "No book with such ID" });
  }

  if (book.createdBy !== userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, msg: "Unauthorized request" });
  }

  const updatedBook = await findOneAndUpdate({ _id: bookId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (updatedBook) {
    return res
      .status(StatusCodes.OK)
      .json({
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
