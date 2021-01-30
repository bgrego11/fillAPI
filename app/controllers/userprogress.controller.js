const db = require("../models");
const Userprogress = db.userprogress;
const Op = db.Sequelize.Op;

// Create and Save a new userprogress
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a userprogress
  const userprogress = {
    user_id: req.body.user_id,
    story_id: req.body.story_id,
  };

  // Save userprogress in the database
  Userprogress.create(userprogress)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the userprogress."
      });
    });
};


// // Retrieve all userprogresss from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Userprogress.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving userprogresss."
        });
      });
  };

// // Find a single userprogress with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Userprogress.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving userprogress with id=" + id
        });
      });
  };

// // Update a userprogress by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Userprogress.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "userprogress was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update userprogress with id=${id}. Maybe userprogress was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating userprogress with id=" + id
        });
      });
  };

// // Delete a userprogress with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Userprogress.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "userprogress was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete userprogress with id=${id}. Maybe userprogress was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete userprogress with id=" + id
        });
      });
  };

// // Find all published userprogresss
// exports.findAllPublished = (req, res) => {
  
// };