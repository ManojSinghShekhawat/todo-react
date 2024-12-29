const Todo = require("../models/todoModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middleware/asyncError");

//create a new todo

const createTodo = asyncErrorHandler(async (req, res) => {
  req.body.user = req.user.id;
  const newTask = new Todo(req.body);
  const savedTask = await newTask.save();

  return res.status(201).json({
    success: true,
    savedTask,
  });
});

//get all todos

const getAllTodos = asyncErrorHandler(async (req, res) => {
  const { id } = req.user;
  // console.log(id);
  const allTodos = await Todo.find({ user: id });
  // const allTodos = await Todo.find();
  return res.status(200).json({
    success: true,
    allTodos,
  });
});

//get a todo

const getTodo = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    return next(new ErrorHandler("No such todo found", 404));
  }
  return res.status(200).json({
    success: true,
    todo,
  });
});

//update a todo

const updateTodo = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;

  const updateTodo = await Todo.findByIdAndUpdate(id, updatedTodo, {
    new: true,
    runValidators: true,
  });
  if (!updateTodo) {
    return next(new ErrorHandler("no such todo exist", 404));
  }
  return res.status(201).json({
    success: true,
    updateTodo,
  });
});

//delete a todo

const deleteTodo = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;

  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) {
    return next(new ErrorHandler("no such todo exist", 404));
  }
  return res.status(200).json({
    success: true,
    message: "Todo Deleted Successfully",
  });
});

module.exports = { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo };
