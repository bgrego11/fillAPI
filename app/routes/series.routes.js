module.exports = app => {
    const series = require("../controllers/series.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Series
    router.post("/", series.create);
  
    // Retrieve all series
    router.get("/", series.findAll);
  
    // // Retrieve all published series
    // router.get("/published", series.findAllPublished);
  
    // // Retrieve a single Series with id
    router.get("/:id", series.findOne);
  
    // // Update a Series with id
    router.put("/:id", series.update);
  
    // // Delete a Series with id
    router.delete("/:id", series.delete);
  
    // // Delete all series
    // router.delete("/", series.deleteAll);
  
    app.use('/api/series', router);
  };