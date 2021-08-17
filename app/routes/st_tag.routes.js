module.exports = app => {
    const st_tag = require("../controllers/st_tag.controller.js");
  
    var router = require("express").Router();
  
    // Create a new st_tag
    router.post("/", st_tag.create);
  
    // Retrieve all st_tag
    router.get("/", st_tag.findAll);
  
 
  
    // // Update a st_tag with id
    router.put("/:id", st_tag.update);
  
    // // Delete a st_tag with id
    router.delete("/:id", st_tag.delete);
  
    // // Delete all st_tag
    // router.delete("/", st_tag.deleteAll);
  
    app.use('/api/storytag', router);
  };