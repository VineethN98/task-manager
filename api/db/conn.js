const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/TaskManager", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB");
    console.log(err);
  });

module.exports = {
  mongoose,
};
