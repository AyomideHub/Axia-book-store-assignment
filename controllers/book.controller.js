const Book = require("../models/book.model");
const { StatusCodes } = require("http-status-codes");

const createbook = async (req, res) => {
  // const { title, description, category } = req.body;
  // const userId = req.user.id;
  const {user: {id: userId}, body: {title, description, category}} = req

  if (!title || !description || !category) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "All field are required" });
  }

  try {
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
    msg: "Book added sucessfully",
    data: { ...newbook._doc },

  });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, name: error.name, msg: error.message});
  }

  
};

const deletebook = async (req, res) => {
  // const bookId = req.params.id;
  // const userId = req.user.id;
  const {user: {id: userId}, params: {id: bookId}} = req

  try {
    // const book = await Book.findOne({ _id: bookId });

    // if (!book) {
    //   return res.status(StatusCodes.BAD_REQUEST).json({
    //     success: false,
    //     msg: `No Book with such id ${bookId}`,
    //   });
    // }
    
    // console.log(userId)
    // console.log(book.createdBy.toString())
   
    // if ( book.createdBy.toString() !== userId ) {
    //   return res.status(StatusCodes.UNAUTHORIZED).json({
    //     success: false,
    //     name: error.name,
    //     msg: "Unauthorized request, you don't have permission to delete this book",
    //   });
    // }

    const deletedBook = await Book.findOneAndDelete({ _id: bookId, createdBy: userId });

    if (deletedBook) {
      return res.status(StatusCodes.OK).json({
        success: true,
        msg: "Book deleted successfully",
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        msg: "Unable to delete the book,",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      name: error.name,
      msg: error.message,
    });
  }
};

const updatebook = async (req, res) => {
  // const bookId = req.params.id;
  // const userId = req.user.id;
  const {user: {id: userId}, params: {id: bookId}} = req

  try {
    const book = await Book.findOne({ _id: bookId });

    if (!book) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, msg: "No book with such ID" });
    }
  
    if (book.createdBy.toString() !== userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        msg: "Unauthorized request, you dont have permission to edit this book",
      });
    }
  
    const updatedBook = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
      new: true,// to send back the new values instead of the old
      runValidators: true,
      // overwrite: true
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
    
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      name: error.name,
      msg: error.message,
    });
  }
 
};

const getBooks = async (req, res) => {
  const userId = req.user.id
  try {
  
    const books = await Book.find({createdBy: userId}).populate('createdBy', 'username email');

  res
    .status(StatusCodes.OK)
    .json({
      success: true,
      msg: "sucessfully",
      data: { books, nbHits: books.length },
    });
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, name: error.name, msg: error.message});
  }
  
};

const getBook = async (req, res) => {
  const bookId = req.params.id;
  
  try {
    const book = await Book.findOne({_id: bookId}).populate('createdBy', 'username email');

  res
    .status(StatusCodes.OK)
    .json({
      success: true,
      msg: "sucessfully",
      data: { book, nbHits: book.length },
    });

  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ success: false, name: error.name, msg: error.message});
  }
  
};

module.exports = { createbook, deletebook, updatebook, getBooks, getBook };