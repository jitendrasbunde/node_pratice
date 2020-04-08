const db = require("../models/index");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  let info ; 
  if(req.body!==undefined){
    info = req.body;
  }else{
    info = req;
  }
  if (!info.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
    console.log(info.title+'  '+info.description)
  // Create a Tutorial
  const tutorial = {
    title: info.title,
    description: info.description,
    published: info.published ? info.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      console.log("hi data in then");
      if(req.body!==undefined){
        res.send(201)
      }
      return data;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
  exports.findAll = (req, res) => {
    return Tutorial.findAll({attributes: ['title', 'description','published']})
      .then(data => {
       // console.log(JSON.stringify(data))
        debugger
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  };


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};