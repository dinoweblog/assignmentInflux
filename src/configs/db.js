const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://dinesh-sharma:dinesh@cluster0.pm3c3.mongodb.net/itemMaster?retryWrites=true&w=majority"
  );
};
