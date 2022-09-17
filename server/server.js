require('dotenv').config();
const express = require('express');
const authRoutes = require("./routes/auth");
const registerRoutes = require("./routes/register");
const logoutRoutes = require("./routes/logout");
const listingsRoutes = require("./routes/listings");
const usersRoutes = require("./routes/users");
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// routes
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/logout', logoutRoutes);
app.use('/listings',listingsRoutes);
app.use('/users',usersRoutes);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});