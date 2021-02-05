const { Router } = require("express");
const router = Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

router.route("/").get(getUsers);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
