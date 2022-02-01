const Todo = require("../models/todo");
const {
  createSchema,
  getSchema,
  getOneSchema,
  updateSchema,
  deleteSchema,
} = require("../validation/todoSchema");

const todoController = () => {
  const createTodo = async (req, res) => {
    try {
      const result = await createSchema.validateAsync(req.body);
      console.log(req.body);
      let data = {
        heading: req.body.heading,
        note: req.body.note,
      };
      const nTodo = new Todo(data);
      await nTodo.save();
      return res.status(200).json({
        status: "success",
        code: "001",
        description: "To Do saved successfully",
      });
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(500).json({
          status: "fail",
          code: "002",
          description: err.details[0].message,
        });
      }
      console.log(err);
      return res.status(500).json({
        status: "fail",
        code: "002",
        description: "something went wrong",
      });
    }
  };
  const getTodo = async (req, res) => {
    try {
      const result = await getSchema.validateAsync(req.query);

      const page = parseInt(req.query.page, 10) || 0;
      const limit = parseInt(req.query.limit, 10) || "";
      const query = req.query.q || "";

      let condition = {};
      if (query != "") {
        condition.heading = { $regex: ".*" + query + ".*" };
      }
      condition.is_active = true;
      console.log(condition);

      let todoData = await Todo.find(condition)
        .limit(limit)
        .skip(limit * page)
        .select("-__v")
        .exec();
      let count = await Todo.find(condition).countDocuments().exec();
      res.status(200).json({
        status: "success",
        code: "001",
        description: "Todo data success",
        no_of_items: count,
        data: todoData,
      });
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(500).json({
          status: "fail",
          code: "002",
          description: err.details[0].message,
        });
      }
      console.log(err);
      return res.status(500).json({
        status: "fail",
        code: "002",
        description: "something went wrong",
      });
    }
  };
  const getOne = async (req, res) => {
    try {
      const result = await getOneSchema.validateAsync(req.params);
      console.log(req.params);
      let todoData = await Todo.findOne({
        _id: req.params.id,
        is_active: true,
      });

      res.status(200).json({
        status: "success",
        code: "001",
        description: "Todo data success",
        data: todoData || {},
      });
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(500).json({
          status: "fail",
          code: "002",
          description: err.details[0].message,
        });
      }
      console.log(err);
      return res.status(500).json({
        status: "fail",
        code: "002",
        description: "something went wrong",
      });
    }
  };
  const updateTodo = async (req, res) => {
    try {
      const result = await updateSchema.validateAsync(req.body);
      const { heading, note, id } = req.body;
      let updateData = {};
      if (heading) updateData.heading = heading;
      if (note) updateData.note = note;
      let todoData = await Todo.findOneAndUpdate(
        { _id: id, is_active: true },
        updateData
      );
      if (!todoData) {
        return res.status(200).json({
          status: "fail",
          code: "002",
          description: "Todo not found",
        });
      }

      return res.status(200).json({
        status: "success",
        code: "001",
        description: "Todo updated",
      });
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(500).json({
          status: "fail",
          code: "002",
          description: err.details[0].message,
        });
      }
      console.log(err);
      return res.status(500).json({
        status: "fail",
        code: "002",
        description: "something went wrong",
      });
    }
  };
  const deleteTodo = async (req, res) => {
    try {
      const result = await deleteSchema.validateAsync(req.body);
      const { id } = req.body;
      let updateData = { is_active: false };

      let todoData = await Todo.findOneAndUpdate(
        { _id: id, is_active: true },
        updateData
      );
      if (!todoData) {
        return res.status(200).json({
          status: "fail",
          code: "002",
          description: "Todo not found",
        });
      }

      return res.status(200).json({
        status: "success",
        code: "001",
        description: "Todo deleted",
      });
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(500).json({
          status: "fail",
          code: "002",
          description: err.details[0].message,
        });
      }
      console.log(err);
      return res.status(500).json({
        status: "fail",
        code: "002",
        description: "something went wrong",
      });
    }
  };
  return { createTodo, getTodo, getOne, updateTodo, deleteTodo };
};
module.exports = todoController;
