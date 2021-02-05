const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    pass: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["SUPER_ADMIN", "OWNER", "STORE"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("user", userSchema);
