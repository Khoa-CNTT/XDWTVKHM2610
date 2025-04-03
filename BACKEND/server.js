const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
