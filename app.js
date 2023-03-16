const express = require('express');
const multer = require('multer');
const uuid = require('uuid/v4');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { format } = require('timeago.js');
const morgan = require('morgan')

const path = require('path');

//Loading configurations
dotenv.config({ path: "./config/config.env" });
connectDB();

// intializations
const app = express();
app.use(morgan("dev"));

// settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));

// Global variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

// routes
app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start
app.listen(process.env.PORT | 3000, () => {
    console.log(`Server started on port`, process.env.PORT);
});
