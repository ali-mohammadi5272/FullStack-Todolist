import { isValidObjectId } from "mongoose";
import todoModel from "../models/todo.js";

export const getAll = async (req, res) => {
  try {
    const todos = await todoModel.find({}, "-__v").lean();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = await todoModel.create({
      title,
      isCompleted: false,
    });
    const todoObject = newTodo.toObject();
    Reflect.deleteProperty(todoObject, "__v");

    return res.status(201).json({
      message: "Todo added successfully :))",
      todo: todoObject,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return res.status(422).json({ message: "Todo Id is not valid !!" });
    }
    const todo = await todoModel.findOne({ _id: id }, "-__v").lean();
    if (!todo) {
      return res.status(404).json({ message: "Todo not found !!" });
    }
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const removeTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return res.status(422).json({ message: "Todo Id is not valid !!" });
    }
    const todo = await todoModel.findOneAndDelete({ _id: id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found !!" });
    }
    return res.status(200).json({
      message: "Todo removed successfully :))",
      todo,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const completeTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return res.status(422).json({ message: "Todo Id is not valid !!" });
    }
    const { isCompleted } = req.body;
    const todo = await todoModel
      .findOneAndUpdate(
        { _id: id },
        {
          isCompleted,
        }
      )
      .lean();
    if (!todo) {
      return res.status(404).json({ message: "Todo not found !!" });
    }
    return res.status(200).json({
      message: "Todo updated successfully :))",
      todo: { ...todo, isCompleted },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
