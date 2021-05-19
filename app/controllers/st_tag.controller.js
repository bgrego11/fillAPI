const db = require("../models");
const St_Tag = db.st_tag;
const Op = db.Sequelize.Op;

// Create and Save a new St_Tag
exports.create = (req, res) => {
  // Validate request
  if (!req.body.story_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a St_Tag
  const st_tag = {
    tag: req.body.tag,
    story_id: req.body.story_id,
  };

  // Save St_Tag in the database
  St_Tag.create(st_tag)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the St_Tag."
      });
    });
};


// // Retrieve all St_Tags from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    St_Tag.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving St_Tags."
        });
      });
  };

// // Find a single St_Tag with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     St_Tag.findAll({where: { : id }})
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving St_Tag with id=" + id
//         });
//       });
//   };

// // // Update a St_Tag by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    St_Tag.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "St_Tag was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update St_Tag with id=${id}. Maybe St_Tag was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating St_Tag with id=" + id
        });
      });
  };

// Delete a St_Tag with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;
  
    St_Tag.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "St_Tag was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete St_Tag with id=${id}. Maybe St_Tag was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete St_Tag with id=" + id
        });
      });
  };

// // Find all published St_Tags
// exports.findAllPublished = (req, res) => {
  
// };