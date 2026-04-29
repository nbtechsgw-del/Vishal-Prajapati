const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");

router.post("/borrow", borrowController.borrowBook);
router.post("/return", borrowController.returnBook);
router.get("/", borrowController.getAllBorrows);
router.get("/user/:userId", borrowController.getUserBorrows);
router.get("/active/all", borrowController.getActiveBorrows);

module.exports = router;
