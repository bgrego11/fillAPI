const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const server = require('http').Server(app);

const app = express();

const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./fillreact", "build")));
app.use(express.static("public"));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './fillreact/build', 'index.html'))
})

require("./app/routes/series.routes")(app);
require("./app/routes/story.routes")(app);
require("./app/routes/section.routes")(app);
require("./app/routes/userprogress.routes")(app);
require("./app/routes/stripe.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});