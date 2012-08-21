// load the modules needed for the API
var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');

// create the web server
var app = express();

// hooking up the database
mongoose.connect('mongodb://localhost/ecomm_database');

// config
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public"))); // sets up the public directory to use static files
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

app.get('/api', function (req, res) {
  res.send('eCommerce API is running.');
});

app.listen(4242);