const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const connectDb = require("./config/connectDb");
// config dot env file
dotenv.config();

const app = express();

//databse call
connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes declaration.
//user routes
app.use("/api/v1/users", require("./routes/userRoute"));
//transections routes
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/hello", (req,res)=>{
  res.send("Hello World!");
})

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });
