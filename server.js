const express = require("express");
const app = express();
const db = require("./db"); 
require('dotenv').config();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes');
// use the router
app.use("/person", personRoutes);

const PORT = process.env.PORT || 3000;

const menuItemRoutes = require("./routes/menuItemRoutes");
app.use("/menu", menuItemRoutes);


app.get("/", (req, res) => {
    res.send("welcome to my hotel... How can i help you ?, we have list of menus");
});



app.listen(PORT, () => {
    console.log("listening on port 3000");
})