//export the following
//mongodb connection string, found on mlab site
module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY
};
