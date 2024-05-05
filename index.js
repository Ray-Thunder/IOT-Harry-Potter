const express = require("express");
const routes = require("./routes/start");
const app = express();
const ip = require("ip");
const ipAddr = ip.address();
const bodyParser = require("body-parser");
const port = 3000;


let lastHouseVisited = "Gryffindor";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes);
const cors = require("cors");
app.use(cors());

app.post("/", (req, res) => {
  lastHouseVisited = req.body.house;
  res.json({ message: lastHouseVisited });
});

app.listen(port, () => {
  console.log("Server run: http://" + ipAddr + ":3000");
});

// /users en GET = tous les utilisateurs
// /users en POST = créer un utilisateur
// /users/:id en GET = un utilisateur
// /users/:id en PUT = modifier un utilisateur
// /users/:id en DELETE = supprimer un utilisateur
