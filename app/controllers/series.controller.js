const db = require("../models");
const Series = db.series;
const Op = db.Sequelize.Op;

// Create and Save a new Series
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Series
  const series = {
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
    likes: req.body.likes
  };

  // Save Series in the database
  Series.create(series)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Series."
      });
    });
};


// // Retrieve all Seriess from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Series.findAll({include: ["stories"]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Seriess."
        });
      });
  };

// // Find a single Series with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Series.findByPk(id,{include: ["stories"]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Series with id=" + id
        });
      });
  };

// // Update a Series by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Series.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Series was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Series with id=${id}. Maybe Series was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Series with id=" + id
        });
      });
  };

// // Delete a Series with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Series.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Series was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Series with id=${id}. Maybe Series was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Series with id=" + id
        });
      });
  };

// // Find all published Seriess
// exports.findAllPublished = (req, res) => {
  
// };