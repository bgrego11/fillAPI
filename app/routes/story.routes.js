module.exports = app => {
    const story = require("../controllers/story.controller.js");
  
    var router = require("express").Router();
  
    // Create a new story
    router.post("/", story.create);
  
    // Retrieve all story
    router.get("/", story.findAll);
  
    // // Retrieve all published story
    // router.get("/published", story.findAllPublished);
  
    // // Retrieve a single story with id
    router.get("/:id", story.findOne);
  
    // // Update a story with id
    router.put("/:id", story.update);
  
    // // Delete a story with id
    router.delete("/:id", story.delete);
  
    // // Delete all story
    // router.delete("/", story.deleteAll);
  
    app.use('/api/story', router);
  };