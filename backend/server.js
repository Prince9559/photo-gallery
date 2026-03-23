const express = require("express");
const cors = require("cors");
const path = require("path");
const adminRoutes = require("./routes/adminRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const fileRoutes = require("./routes/fileRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/files", fileRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});