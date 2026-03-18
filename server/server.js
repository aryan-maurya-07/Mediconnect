const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/medicine", medicineRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/mediconnect")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.get("/", (req,res)=>{
    res.send("Mediconnect Backend Running");
});

app.use("/api/auth", authRoutes);
app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});

