const express = require("express");
const {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const { isAutheticated } = require("../middleware/auth");
const router = express.Router();

router.route("/newtodo").post(isAutheticated, createTodo);
router.route("/todos").get(isAutheticated, getAllTodos);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
