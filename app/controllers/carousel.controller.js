const db = require("../models");
const Carousel = db.carousel;
const Op = db.Sequelize.Op;

// Create and Save a new Story
exports.create = (req, res) => {
  // Validate request
  if (!req.body.dt_url) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Story
  const carousel = {
    dt_url: req.body.dt_url,
    dt_route_name: req.body.dt_route_name,
    mb_url: req.body.mb_url,
    mb_route_name: req.body.mb_route_name,
    
  };

  // Save Story in the database
  Carousel.create(carousel)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Story."
      });
    });
};


// // Retrieve all Storys from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Carousel.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Carousel."
        });
      });
  };

// // Find a single Story with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Carousel.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Carousel with id=" + id
        });
      });
  };

// // Update a Story by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Carousel.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Story was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Story with id=${id}. Maybe Story was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Story with id=" + id
        });
      });
  };

// // Delete a Story with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Carousel.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Story was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Story with id=${id}. Maybe Story was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Story with id=" + id
        });
      });
  };

// // Find all published Storys
// exports.findAllPublished = (req, res) => {
  
// };