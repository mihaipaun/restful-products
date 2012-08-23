In which I explore creating a RESTful API using Node.js, Express, MongoDB with Mongoose, and then I use Backbone.js to interact with the web service.

### Notes
* Read more about [schema types](http://mongoosejs.com/docs/schematypes.html)
* Fiddle with the web service in the console by creating a new product:

        jQuery.post("/api/products", {
          "title": "My Awesome T-shirt",
          "description": "All about the details. Of course it's black.",
          "style": "12345"
        }, function (data, textStatus, jqXHR) {
            console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
        });

* or by reading the product data previously created (this request reads all products)

        jQuery.get("/api/products/", function (data, textStatus, jqXHR) {
          console.log("Get resposne:");
          console.dir(data);
          console.log(textStatus);
          console.dir(jqXHR);
        });

* or by reading a specific product (modify the uniquely generated ID)

        jQuery.get("/api/products/50339f8223370e810a000001", function(data, textStatus, jqXHR) {
          console.log("Get resposne:");
          console.dir(data);
          console.log(textStatus);
          console.dir(jqXHR);
        });

* or by updating using PUT

        jQuery.ajax({
          url: "/api/products/50339f8223370e810a000001",
          type: "PUT",
          data: {
            "title": "My Awesome T-shirt in Black",
            "description": "All about the details. Of course it's black, and long sleeve",
            "style": "12345"
          },
          success: function (data, textStatus, jqXHR) {
              console.log("Post resposne:");
              console.dir(data);
              console.log(textStatus);
              console.dir(jqXHR);
          }
        });

* or finally by deleting the product 

        jQuery.ajax({
          url: "/api/products/50339f8223370e810a000001", 
          type: "DELETE",
          success: function (data, textStatus, jqXHR) { 
            console.log("Post resposne:"); 
            console.dir(data); 
            console.log(textStatus); 
            console.dir(jqXHR); 
          }
        });

* Backbone uses a [sync](http://documentcloud.github.com/backbone/#Sync) object to interact with the API
* Each product in the #list represents data found in the model
* The product #list represents a collection of (product) models
* The HTML is generated using a view which renders data - blending the model's JSON data with a template
* A route triggers the asynchronous process of fetching data and rendering the product #list by listening for a [hashchange](http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html#event-hashchange) or using [pushState](https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history)
* Look into Backbone's [Routers](http://documentcloud.github.com/backbone/#Router), [Models](http://documentcloud.github.com/backbone/#Model), [Views](http://documentcloud.github.com/backbone/#View), [Collections](http://documentcloud.github.com/backbone/#Collection), [Backbone.sync](http://documentcloud.github.com/backbone/#Sync) and [Backbone.history](http://documentcloud.github.com/backbone/#History)
* Also, [jQuery deferred object](http://api.jquery.com/category/deferred-object/), [Mustache](https://github.com/janl/mustache.js/)