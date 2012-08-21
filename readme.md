In which I explore creating a RESTful API using Node.js, Express, MongoDB and Mongoose.

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