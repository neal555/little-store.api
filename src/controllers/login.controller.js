const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const loginController = {};
loginController.login = async (req, res) => {
  const { email, pass } = req.body;
  const user = await User.findOne({ email: email }).exec();
  if (user) {
    const match = await bcrypt.compare(pass, user.pass);
    if (match) {
      const payload = {
        check: true,
      };
      const token = jwt.sign(payload, process.env.SUPER_KEY, {
        expiresIn: 1440,
      });
      res.json({
        statusCode: 200,
        message: "Authorized",
        token: token,
        user,
      });
    } else {
      res.json({
        statusCode: 400,
        message: "Unauthorized",
      });
    }
  } else {
    res.json({
      statusCode: 400,
      message: "Email no exist",
    });
  }
};

module.exports = loginController;
