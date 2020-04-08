
  const service = require('../services/greeter_client')
  const router = require("express").Router();

  const bodyParser = require('body-parser');
  router.use(bodyParser.json());
  // Create a new Tutorial
  router.post("/", service.addUser,(req,res)=>{
    res.send({message:"data iis inserted"})
  });

  router.get("/", service.bookList,(req,res,data)=>{
    res.send(data)
  });

module.exports = router;