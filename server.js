const express = require("express");
const app = express();
const db = require("./db"); 
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes');
// use the router
app.use("/person", personRoutes);

const menuItemRoutes = require("./routes/menuItemRoutes");
app.use("/menu", menuItemRoutes);


app.get("/", (req, res) => {
    res.send("welcome to my hotel... How can i help you ?, we have list of menus");
});



app.listen(3000, () => {
    console.log("listening on port 3000");
})