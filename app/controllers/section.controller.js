const db = require("../models");
const Section = db.section;
const Op = db.Sequelize.Op;

// Create and Save a new Story
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Story
  const section = {
    title: req.body.title,
    sub_title: req.body.sub_title,
    text: req.body.text,
    order: req.body.order,
    story_id: req.body.story_id
    
  };

  // Save Story in the database
  Section.create(section)
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
  
    Section.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Section."
        });
      });
  };

// // Find a single Story with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Section.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Section with id=" + id
        });
      });
  };

// // Update a Story by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Section.update(req.body, {
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
  
    Section.destroy({
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