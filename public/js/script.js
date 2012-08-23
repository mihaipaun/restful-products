PX = window.PX || {};

// model
PX.Product = Backbone.Model.extend({
  defaults: {
    title: null,
    description: null
  }
});

PX.ProductList = Backbone.Collection.extend({
  model: PX.Product, // the model property has a constructor object used to generate models as members of the products collection
  url: '/api/products', // the url property is the web service that Backbone.sync will call to fetch the data
  initialize: function () {
    this.fetch({
      success: this.fetchSuccess,
      error: this.fetchError
    });
    this.deferred = new $.Deferred(); // will be resolved during execution of the fetch success handler function
  },
  deferred: Function.constructor.prototype,
  // resolves the collection's deferred object
  fetchSuccess: function (collection, response) {
    collection.deferred.resolve();
  },
  fetchError: function (collection, response) {
    throw new Error("Products fetch did get collection from API");
  }
});

PX.products = new PX.ProductList();

/*
  The product list items’ view constructor uses a (list item) li tag and during initialization selects some HTML to use as an HTML template.
  This template will be used to render the JSON data for each product.
*/
PX.ProductListItemView = Backbone.View.extend({
  tagName: "li",
  className: "product",
  initialize: function (options) {
    this.template = $('#product-template').html();
  },
  render: function () {
    var markup = Mustache.to_html(this.template, this.model.toJSON());
    this.$el.html(markup).attr("id", this.model.get("_id"));
    return this;
  }
});

/*
  The constructor for the product list view above uses an (unordered list) ul tag and will be responsible for rendering a list of products.
  The render method uses an iteration over the object’s collection to build the list of products.
*/
PX.ProductListView = Backbone.View.extend({
  tagName: "ul",
  className: "products",
  render: function () {
    if(this.collection) {
      for (var i = 0; i < this.collection.length; i++) {
        this.renderItem(this.collection.models[i]);
      }
    }
    $(this.container).find(this.className).remove();
    this.$el.appendTo(this.options.container);
    return this; // refers to the view object itself
  },
  renderItem: function (model) {
    // item is constructed with a model from the products' collection.
    // The item object is a view instance for each product in the list.
    var item = new PX.ProductListItemView({
      "model": model
    });
    item.render().$el.appendTo(this.$el); // when this is executed, the result of rendering the product (item) is appended to the ul (this.$el) element which belongs to the product list view instance object
  }
});

// Application
/*
  PX.App is a constructor with a prototype that extends the Backbone.Router function
  The argument for the Backbone.Router.extend method is the prototype for the router object used to render the products' list
*/
PX.App = Backbone.Router.extend({
  routes: {
    "/": "listProducts", // listProducts is the name of the function that handles the routes
    "list": "listProducts"
  },
  // routes' handler method
  listProducts: function () {
    var productsList = new PX.ProductListView({
      "container": $("#container"), // the jQuery object where I will render the products list or "view"
      "collection": PX.products // a list of products (collection of product models)
    });
    // using a jQuery deferred object to indicate when the collection is ready
    // the function accepts functions as arguments which can be executed when the deferred object is resolved
    PX.products.deferred.done(function () {
      // the render method is called when a list of products (collection instance) is populated with models (data)
      productsList.render();
    });
  }
});

// bootstrap the Application
PX.App = new PX.App(); // returns the instance of the router
Backbone.history.start(); // handles monitoring of the hashchange or HTML5 pushState
// When a route is matched in the URL e.g. /#list the assigned function is called to handler the route’s behavior.