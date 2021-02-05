const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const signupController = {};
signupController.signup = async (req, res) => {
  let message;
  let statusCode;
  const { username, email, pass } = req.body;
  bcrypt.hash(pass, saltRounds, async function (err, hash) {
    if (err) {
      statusCode = 400;
      message = "Fail to generate and has pass";
    } else {
      const saved = await saveUser(username, email, hash);
      if (saved) {
        statusCode = 200;
        message = "user saved successfuly";
      } else {
        statusCode = 400;
        message = "FailToSaveUser";
      }
    }
    res.json({
      statusCode,
      message,
    });
  });
};

async function saveUser(username, email, pass) {
  let succes;
  try {
    const newUser = new User({
      username,
      email,
      pass,
    });
    await newUser.save();
    succes = true;
  } catch (error) {
    succes = false;
  }
  return succes;
}

module.exports = signupController;
