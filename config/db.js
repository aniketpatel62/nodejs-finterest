const mongoose = require("mongoose");

//Using promises
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //To avoid warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`MongoDB Connected!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
