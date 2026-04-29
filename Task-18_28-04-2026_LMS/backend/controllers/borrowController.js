const { Borrow, Book, User } = require("../models");
const { Op } = require("sequelize");

exports.borrowBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "userId and bookId are required",
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Book is not available",
      });
    }

    const activeBorrow = await Borrow.findOne({
      where: {
        userId,
        bookId,
        status: "borrowed",
      },
    });

    if (activeBorrow) {
      return res.status(400).json({
        success: false,
        message: "User already has this book borrowed",
      });
    }

    const borrow = await Borrow.create({
      userId,
      bookId,
      borrowDate: new Date(),
      status: "borrowed",
    });

    await book.update({ status: "borrowed" });

    res.status(201).json({
      success: true,
      data: borrow,
      message: "Book borrowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    if (!borrowId) {
      return res.status(400).json({
        success: false,
        message: "borrowId is required",
      });
    }

    const borrow = await Borrow.findByPk(borrowId);

    if (!borrow) {
      return res.status(404).json({
        success: false,
        message: "Borrow record not found",
      });
    }

    if (borrow.status === "returned") {
      return res.status(400).json({
        success: false,
        message: "Book already returned",
      });
    }

    await borrow.update({
      returnDate: new Date(),
      status: "returned",
    });

    const book = await Book.findByPk(borrow.bookId);
    await book.update({ status: "available" });

    res.json({
      success: true,
      data: borrow,
      message: "Book returned successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Book, attributes: ["id", "title", "author", "imageUrl"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: borrows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserBorrows = async (req, res) => {
  try {
    const { userId } = req.params;

    const borrows = await Borrow.findAll({
      where: { userId },
      include: [
        { model: Book, attributes: ["id", "title", "author", "imageUrl"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: borrows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getActiveBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.findAll({
      where: { status: "borrowed" },
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Book, attributes: ["id", "title", "author", "imageUrl"] },
      ],
      order: [["borrowDate", "DESC"]],
    });

    res.json({
      success: true,
      data: borrows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
