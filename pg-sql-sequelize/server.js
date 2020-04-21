const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routers = require('./app/routers/routes')
const app = express();
const serviceOn = require('./services/serviceServerSide')
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use('/api/tutorials', routers);
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models/index");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

serviceOn.main();

// set port, listen for requests
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});