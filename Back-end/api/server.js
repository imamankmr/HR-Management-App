const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("../routes/authRoutes");

const candidatesRoutes = require("../routes/candidatesRoutes");
const path = require("path");
const employeeRoutes = require("../routes/employeeRoutes");


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT ;






// Middleware

const corsOptions = {
  origin: 'https://hr-management-app-q6s5.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/candidates", candidatesRoutes);
app.use("/api/employees", employeeRoutes); 



// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get('/', (req, res) => {
  res.status(200).send('Backend is running!');
});


module.exports = (req, res) => {
  app(req, res); 
};
