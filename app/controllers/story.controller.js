const db = require("../models");
const Story = db.story;
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
  const story = {
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration,
    url: req.body.url,
    artwork: req.body.artwork,
    series_id: req.body.series_id,
    type: req.body.type,
    album: req.body.album
  };

  // Save Story in the database
  Story.create(story)
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
  
    Story.findAll({include: ["sections","st_tags"]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Storys."
        });
      });
  };

// // Find a single Story with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Story.findByPk(id,{include: ["sections","st_tags"]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Story with id=" + id
        });
      });
  };

// // Update a Story by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Story.update(req.body, {
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
  
    Story.destroy({
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