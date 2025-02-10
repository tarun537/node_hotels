const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

router.get("/", async (req, res) => {
    try{
        const data = await MenuItem.find();
        console.log('data fetch');
        res.status(200).json(data);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"})
    }
})

router.get("/:taste", async (req, res) => {
    try{
        const qtaste = req.params.taste;
        if (qtaste == 'sour' || qtaste == 'spicy' || qtaste == 'sweet') {
            const data = await MenuItem.find({taste: qtaste});
            console.log('data fetch');
            res.status(200).json(data);
        }else {
            res.status(404).json({error: "invalid taste type"})
        }
    } catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"})
    }
})

router.post("/", async (req, res) => {
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log("data saved");
        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

module.exports = router;