// const { Router } = require("express");
// const Todo = require("../../models/Todo");

// const router = Router();

// router.get("/", async (req, res) => {
//   try {
//     const todolist = await Todo.find();
//     if (!todolist) throw new Error("No Todo List found");
//     res.status(200).json(todolist);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post("/", async (req, res) => {
//   const newCart = new Cart();
// });

// router.post("/", async (req, res) => {
//   const newTodo = new Todo(req.body);

//   try {
//     const todo = await newTodo.save();
//     if (!todo) throw new Error("Something went wrong saving the Todo");
//     res.status(201).json(todo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const removed = await Todo.findByIdAndDelete(id);
//     if (!removed) throw new Error("Todo not found");
//     res.status(200).json(removed);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
