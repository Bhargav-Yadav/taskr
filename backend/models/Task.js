const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  priority: { type: String, enum: ["high", "medium", "low"], default: "medium" },
  category: { type: String, default: "" },
  deadline: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);