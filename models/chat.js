const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true
    },
    to: {
      type: String,
      required: true,
      trim: true
    },
    msg: {
      type: String,
      required: true,
      maxlength: 500
    }
  },
  {
    timestamps: { createdAt: "created_at" }
  }
);

module.exports = mongoose.model("Chat", chatSchema);
