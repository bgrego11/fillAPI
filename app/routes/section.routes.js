module.exports = app => {
    const section = require("../controllers/section.controller.js");
  
    var router = require("express").Router();
  
    // Create a new section
    router.post("/", section.create);
  
    // Retrieve all section
    router.get("/", section.findAll);
  
    // // Retrieve all published section
    // router.get("/published", section.findAllPublished);
  
    // // Retrieve a single section with id
    router.get("/:id", section.findOne);
  
    // // Update a section with id
    router.put("/:id", section.update);
  
    // // Delete a section with id
    router.delete("/:id", section.delete);
  
    // // Delete all section
    // router.delete("/", section.deleteAll);
  
    app.use('/api/section', router);
  };