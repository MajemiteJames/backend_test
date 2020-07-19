const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected.....");
  } catch (err) {
    console.error(err.message);
    //Exit the process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
