const User = require("../models/User");

const userController = {};
userController.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({
    statusCode: 200,
    data: users,
  });
};

// userController.createUser = async (req, res) => {
//   let message = "user saved successfuly";
//   let statusCode = 200;
//   try {
//     const { username, email } = req.body;
//     const newUser = new User({
//       username,
//       email,
//     });
//     await newUser.save();
//   } catch (error) {
//     statusCode = 400;
//     message = error.message;
//   }
//   res.json({
//     statusCode,
//     message,
//   });
// };

userController.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json({
    data: user,
  });
};
userController.updateUser = async (req, res) => {
  const { username, email } = req.body;
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      username,
      email,
    }
  );
  res.json({
    statusCode: 200,
    message: "updated successfuly",
  });
};
userController.deleteUser = async (req, res) => {
  await User.findOneAndDelete(req.params.id);
  res.json({
    statusCode: 200,
    message: "User has been deleted",
  });
};

module.exports = userController;
