const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose");
const routes = require("./routes/index");
const { dbURI, port } = require("./constants");

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("connected to db successfully!");
});

app.get('/', (req, res) => {
  res.json({
    message: "✌ Hello World! ✌"
  });
});

app.use("/api", routes);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});