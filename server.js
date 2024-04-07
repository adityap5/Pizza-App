require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const ejs = require('ejs');
const path = require('path')
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');

const url = "mongodb://127.0.0.1:27017/pizza";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to Database...");
}).catch(err => {
  console.error("Error connecting to database:", err);
});


app.use(session({
  secret : process.env.COOKIE_SECRET ,
  resave : false,
  saveUninitialized : false,
  cookie:{maxAge : 1000 *60*60*24}
}))

app.use(express.static('public'));

app.use(expressLayout)
app.set('views',path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');


require('./routes/web')(app)





app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})