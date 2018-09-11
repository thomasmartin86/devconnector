//bring in express, mongoose, body-parser and passport
const express = require('express'); //express
const mongoose = require('mongoose'); //mongoose (interact with mongodb connection)
const bodyParser = require('body-parser'); //express middleware
const passport = require('passport'); //use for authentication
const path = require('path');
//define routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//create new instance of express assigned to app const
const app = express();

/*
   body.parser middleware
   body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
   
   -bodyParser.urlencoded({extended: ...}) 
     basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) 
     or complex algorithm for deep parsing that can deal with nested objects (i.e. true).

   -bodyParser.json() 
     tells the system that you want json to be used.
*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config using exported keys
const db = require('./config/keys').mongoURI;

//connect to mongo using mongoose
//returns a promise
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//create a simple route to homepoge and return
app.get('/', (req, res) => res.send('Hello World!'));

//Passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//serve static assests if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//process env port for heroku deployment, locally run on 500
const port = process.env.PORT || 5000;

//listen on port defined above, and console it out
app.listen(port, () => console.log(`Server running on port ${port}`));
