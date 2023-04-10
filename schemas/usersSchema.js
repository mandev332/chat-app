const { Schema, model, Types } = require("mongoose");

function setImage(value) {
  if (value) return value;
  if (this.gender == "male") return "/images/demo/boy.jpg";
  return "/images/demo/girl.jpg";
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      maxLength: 30,
      minLength: [3, "Username length < 3"],
      required: [true, "You must send username"],
      set: (value) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["male", "female"],
        message: "You must enter male or female!",
      },
    },
    imageLink: {
      type: String,
      maxLength: 64,
      set: setImage,
    },
    contact: {
      type: String,
      unique: true,
      set: (number) => {
        if (
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
            number
          )
        )
          return number;
        throw new Error("Invalid contact");
      },
    },
    password: {
      type: String,
      required: true,
      match: /[0-9a-zA-Z]{4,16}/,
    },
    active: {
      type: Boolean,
      default: true,
    },
    // messages: [
    //   {
    //     type: Types.ObjectId,
    //     required: true,
    //     ref: "Message",
    //   },
    // ],
  },
  {
    timestamps: {
      createdAt: "create_at",
      updatedAt: false,
    },
    versionKey: false,
  }
);

const UserModel = model("User", userSchema);
module.exports = UserModel;
