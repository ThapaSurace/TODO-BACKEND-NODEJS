const TODO = require("../model/todoModel");
const USER = require("../model/userModel");

// creating new todo
const addTodo = async (req, res) => {
  const todo = req.body.todo;
  if (!todo) {
    return res.status(400).json({ message: "Cannot be empty" });
  }
  try {
    const result = await TODO.create({
      todo: todo,
      user: req.user.id,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "Wrong data" });
  }
};

// getting todos
const getTodo = async (req, res) => {
  try {
    // req.user.id comes from jwt verify middleware
    // finding todo for the specific user..user that created todo
    const todo = await TODO.find({ user: req.user.id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ message: "Cannot find todos" });
  }
};

// updating todos

const updateTodo = async (req, res) => {
  try {
    const todo = await TODO.findById(req.params.id);
    if (!todo) {
      res.status(400).json({ message: "Todo Id does not exist" });
    }
    const user = await USER.findById(req.user.id);
    if (!user) {
      res.status(401).json({ message: "User does not exist" });
    }
    if (todo.user.toString() !== user.id) {
      res.status(401).json({ message: "User not authorized" });
    }
    const updatedTodo = await TODO.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(404).json({ message: "Cannot update todo" });
  }
};

// delete todos
const deleteTodo = async (req, res) => {
  try {
    const todo = await TODO.findById(req.params.id);
    if (!todo) {
      res.status(400).json({ message: "Todo Id does not exist" });
    }
    const user = await USER.findById(req.user.id);
    if (!user) {
      res.status(401).json({ message: "User does not exist" });
    }
    if (todo.user.toString() !== user.id) {
      res.status(401).json({ message: "User not authorized" });
    }
    await todo.remove();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    req.status(404).json({ message: "Cannot delete todos" });
  }
};

module.exports = {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
