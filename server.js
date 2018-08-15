//bring in express
const express = require('express');
//bring in mongoose
const mongoose = require('mongoose');

//define routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//create new instance of express assigned to app const
const app = express();

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

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//process env port for heroku deployment, locally run on 500
const port = process.env.PORT || 5000;

//listen on port defined above, console out that the server is running on defined port
app.listen(port, () => console.log(`Server running on port ${port}`));
