const { Schema, model, Types } = require("mongoose");

const MessageSchema = new Schema(
  {
    message: {
      type: String,
      trim: true,
      minLength: [1, "messagename length < 1"],
      required: [true, "You must send messagename"],
    },
    file: {
      type: Types.Buffer,
    },
    me: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: "create_at",
      updatedAt: false,
    },
    versionKey: false,
  }
);

const messageaModel = model("Message", MessageSchema);
module.exports = messageaModel;
