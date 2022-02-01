const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const mapRoutes = require("express-routes-mapper");
routes = require("./routes");

//routes
const mappedRoutes = mapRoutes(routes.publicRoutes, "./controllers/");

//setup express app
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
app.use("/api/", mappedRoutes);

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to mongo db");
});

app.listen(port);
console.log(`server listening on port ${port}`);

// Handling not found routes
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "fail",
    message: `Can't find the route ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
