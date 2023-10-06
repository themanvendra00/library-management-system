const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.MONGOURI);

module.exports = {
  connection,
};
