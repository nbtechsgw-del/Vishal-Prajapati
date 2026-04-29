const { Book } = require("../models");
const { Op } = require("sequelize");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json({
        success: true,
        data: [],
      });
    }

    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { author: { [Op.like]: `%${q}%` } },
        ],
      },
    });

    res.json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, description, imageUrl, status } = req.body;

    if (!title || !author || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Title, author, and imageUrl are required",
      });
    }

    const book = await Book.create({
      title,
      author,
      description,
      imageUrl,
      status: status || "available",
    });

    res.status(201).json({
      success: true,
      data: book,
      message: "Book created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, imageUrl, status } = req.body;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await book.update({
      title: title || book.title,
      author: author || book.author,
      description: description || book.description,
      imageUrl: imageUrl || book.imageUrl,
      status: status || book.status,
    });

    res.json({
      success: true,
      data: book,
      message: "Book updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await book.destroy();

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
