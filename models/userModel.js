const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please add a First Name"],
    },

    lastname: {
      type: String,
      required: [true, "Please add a Last Name"],
    },

    email: {
      type: String,
      required: [true, "Please add a Email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid Email",
      ],
    },

    gender: {
      type: String,
      required: [true, "Please add a gender"],
    },

    password: {
      type: String,
      required: [true, "Please add your Password"],
      minLength: [6, "password must be up to 6 characters"],
      //  maxLength: [23, "Password must not be more than 23 characters"],
    },

    verified: {
        type: Boolean,
        default: false
    }
  },

  { timestamps: true }
);

//encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
