const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use()

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.set('layout', __dirname+'/layouts/index');
app.set('view engine', 'ejs');
app.set('views','views');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true });

const logger = require('./app/middleware/logger');
// api route
const categoryApiRoute = require('./app/Routes/api/categoryroute');
const authorApiRoute = require('./app/Routes/api/authorroute');
const bookApiRoute = require('./app/Routes/api/bookroute');
//web route
const authorRoute = require('./app/Routes/web/authorroute');
const bookRoute = require('./app/Routes/web/bookroute');
const categoryroute = require('./app/Routes/web/categoryroute')


app.use(logger)
app.use('/api/category', categoryApiRoute);
app.use('/api/author', authorApiRoute);
app.use('/api/book', bookApiRoute);


app.use('/author', authorRoute);
app.use('/book', bookRoute);
app.use('/category',categoryroute);

app.listen(process.env.PORT, () => { console.log(`Server is running on port ${process.env.PORT}`) });
