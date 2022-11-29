const TODO = require("../model/todoModel");
const USER = require("../model/userModel");

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
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ message: "Wrong data" });
  }
};

const getTodo = async (req, res) => {
  try {
    // req.user.id comes from jwt verify middleware
    // finding todo for the specific user..user that created todo
    const todo = await TODO.find({ user: req.user.id });
    res.status(200).json({ todo });
  } catch (error) {
    res.status(404).json({ message: "Cannot find todos" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await TODO.findById(req.params.id);
    if (!todo) {
      return res.status(400).json({ message: "Todo id not found" });
    }
 
    const user = await USER.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User does not exists" });
    }

    if (todo.user.toString() !== user.id) {
      return res.status(401).json({ message: "User n0t authorized" });
    }
 
    const result = await TODO.findByIdAndUpdate(
      req.params.id,
      {
        todo: req.body.todo,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

// delete todos
const deleteTodo = async (req, res) => {
  try {
    const todo = await TODO.findById(req.params.id);
    if (!todo) {
      return res.status(400).json({ message: "Todo id not found" });
    }

    const user = await USER.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User does not exists" });
    }

    if (todo.user.toString() !== user.id) {
      return res.status(401).json({ message: "User n0t authorized" });
    }

    await todo.remove();
    res.status(200).json({ message: `Todo with ${req.params.id} deleted` });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
