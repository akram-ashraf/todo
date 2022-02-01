const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    heading: { type: String, required: true },
    note: { type: String },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;
