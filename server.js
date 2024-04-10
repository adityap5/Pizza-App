require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const ejs = require('ejs');
const path = require('path')
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);
const url = "mongodb://127.0.0.1:27017/pizza";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.error('Connection error:', err);
});

connection.once('open', () => {
    console.log('Database connected...');
}); 

// mongoose.connect

app.use(flash());

let mongoStore = new MongoDbStore({
  mongooseConnection : connection,
  collections: 'sessions' 
})

app.use(session({
  secret : process.env.COOKIE_SECRET ,
  resave : false,
  store: mongoStore,
  saveUninitialized : false,
  cookie:{maxAge : 1000 *60*60*24}
}))

app.use(express.static('public'));
app.use(express.json())
app.use(expressLayout)

//Global Variable
app.use((req,res,next) => {
    res.locals.session = req.session
    next()
})

app.set('views',path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');


require('./routes/web')(app)





app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})