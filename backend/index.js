const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config({ path: './config/config.env'});

const app = express();

// middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// db connect
connectDB();

// routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/items', require('./routes/items'));
app.get("/", (req, res) => res.send("Hello world"));
app.use(express.static(path.join(__dirname, "./public/")));

// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
