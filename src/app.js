const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

module.exports = app;
//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares

const protectedRoutes = express.Router();
protectedRoutes.use((req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, process.env.SUPER_KEY, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
});

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Routes
app.use("/users", protectedRoutes, require("./routes/users"));
app.use("/products", protectedRoutes, require("./routes/products"));
app.use("/login", require("./routes/login"));
app.use("/signup", require("./routes/signup"));
