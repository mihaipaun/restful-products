// load the modules needed for the API
var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 4242;

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
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true})); // sets up the display of errors on the command line
});

// Schema
var Schema = mongoose.Schema;

// Product model
var Product = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  style: { type: String, unique: true },
  modified: { type: Date, default: Date.now }
});

// use the model
var ProductModel = mongoose.model('Product', Product);

// Add the CRUD methods

// Read a list of products
app.get('/api/products', function (req, res) {
  return ProductModel.find(function (err, products) {
    if (!err) {
      return res.send(products);
    } else {
      return console.log(err);
    }
  });
});

// Create a single product
app.post('/api/products', function (req, res) {
  var product;
  console.log("POST: ");
  console.log(req.body);
  product = new ProductModel({
    title: req.body.title,
    description: req.body.description,
    style: req.body.style
  });
  product.save(function (err) {
    if(!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
});

// Read a single product by ID
app.get('/api/products/:id', function (req, res) {
  return ProductModel.findById(req.params.id, function (err, product) {
    if (!err) {
      return res.send(product);
    } else {
      return console.log(err);
    }
  });
});

// Update a single product by ID
app.put('/api/products/:id', function (req, res) {
  return ProductModel.findById(req.params.id, function (err, product) {
    product.title = req.body.title;
    product.description = req.body.description;
    product.style = req.body.style;
    product.images = req.body.images;
    return product.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(product);
    });
  });
});

// bulk update
app.put('/api/products', function (req, res) {
  var i, len = 0;
  console.log("is Array req.body.products");
  console.log(Array.isArray(req.body.products));
  console.log("PUT: (products)");
  console.log(req.body.products);
  if (Array.isArray(req.body.products)) {
    len = req.body.products.length;
  }
  for (i = 0; i < len; i++) {
    console.log("Update product by id: ");
    for (var id in req.body.products[i]) {
      console.log(id);
    }
    ProductModel.update({ "_id": id}, req.body.products[i][id], function (err, numAffected) {
      if (err) {
        console.log("Error on update");
        console.log(err);
      } else {
        console.log("updated num: " + numAffected);
      }
    });
  }
  return res.send(req.body.products);
});

// Delete a single product by ID
app.delete('/api/products/:id', function (req, res) {
  return ProductModel.findById(req.params.id, function (err, product) {
    return product.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

// bulk delete
app.delete('/api/products', function (req, res) {
  ProductModel.remove(function (err) {
    if (!err) {
      console.log("All products have been removed");
      return res.send('');
    } else {
      console.log(err);
    }
  });
});

app.get('/api', function (req, res) {
  res.send('eCommerce API is running.');
});

app.listen(port, function() {
  console.log("Listening on " + port);
});