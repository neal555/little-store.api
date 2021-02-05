const { Router } = require("express");
const router = Router();
const { signup } = require("../controllers/signup.controller");

router.route("/").post(signup);
module.exports = router;
