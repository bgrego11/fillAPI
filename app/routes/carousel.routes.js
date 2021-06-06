module.exports = app => {
    const carousel = require("../controllers/carousel.controller.js");
  
    var router = require("express").Router();
  
    // Create a new carousel
    router.post("/", carousel.create);
  
    // Retrieve all carousel
    router.get("/", carousel.findAll);
  
    // // Retrieve all published carousel
    // router.get("/published", carousel.findAllPublished);
  
    // // Retrieve a single carousel with id
    router.get("/:id", carousel.findOne);
  
    // // Update a carousel with id
    router.put("/:id", carousel.update);
  
    // // Delete a carousel with id
    router.delete("/:id", carousel.delete);
  
    // // Delete all carousel
    // router.delete("/", carousel.deleteAll);
  
    app.use('/api/carousel', router);
  };