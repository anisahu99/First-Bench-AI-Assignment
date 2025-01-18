// main file
// index.js
require("dotenv").config();
const express = require("express");
const mongoDBConnection = require('./config/dbConnect');

const app = express();
app.use(express.json());

const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
mongoDBConnection();

app.get("/", (req, res) => {
  res.send("backened is running...");
});

app.use("/api/profile", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
