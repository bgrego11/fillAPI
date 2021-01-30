module.exports = app => {
    const userprogress = require("../controllers/userprogress.controller.js");
  
    var router = require("express").Router();
  
    // Create a new userprogress
    router.post("/", userprogress.create);
  
    // Retrieve all userprogress
    router.get("/", userprogress.findAll);
  
    // // Retrieve all published userprogress
    // router.get("/published", userprogress.findAllPublished);
  
    // // Retrieve a single userprogress with id
    router.get("/:id", userprogress.findOne);
  
    // // Update a userprogress with id
    router.put("/:id", userprogress.update);
  
    // // Delete a userprogress with id
    router.delete("/:id", userprogress.delete);
  
    // // Delete all userprogress
    // router.delete("/", userprogress.deleteAll);
  
    app.use('/api/userprogress', router);
  };