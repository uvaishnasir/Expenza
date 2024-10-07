const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    // Set the strictQuery option
    mongoose.set('strictQuery', true); // or false, based on your preference

    const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB Failed: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDb;
