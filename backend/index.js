const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const adminMenuRouter = require("./routes/admin/menu-routes");
const adminUserRouter = require("./routes/admin/user-routes");
const adminStaffRouter = require("./routes/admin/staff-routes");
const adminTableRouter = require("./routes/admin/table-routes");

mongoose
  .connect("mongodb+srv://pranishstha4:Pranish123@rms.otc8usw.mongodb.net/")
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST ", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/menu", adminMenuRouter);
app.use("/api/admin/user", adminUserRouter);
app.use("/api/admin/staff", adminStaffRouter);
app.use("/api/admin/table", adminTableRouter);

app.listen(PORT, () => console.log("Server Is Running"));
