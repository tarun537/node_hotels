const express = require("express");
const router = express.Router();

const Person = require("./../models/person");

//post route to add a person
router.post("/", async (req, res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);
    } 
    catch(err) {
        console.log(err);
        res.status(500).json({error: "internal server error"});
    }
});
//get method to get a person
router.get("/", async (req, res) => {
    try{
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "internal server error"});
    }
});

router.get("/:workType", async(req, res) =>{
    const workType = req.params.workType;
    try{
        if(workType == 'chef' || workType == 'manager' || workType== 'waiter' ){
            const response = await Person.find({work: workType});
            console.log('response fetch');
            res.status(200).json(response);
        } else {
            res.status(404).json({error: "invalid work type"})
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
});

//update
router.put("/:id", async (req, res) => {
    try{
        let personId = req.params.id;
        const newData = req.body;
        const response = await Person.findByIdAndUpdate(personId, newData, {
            new: true, runValidators: true,
        })
        if(!response) return res.status(404).json({error: 'person not found'})
        console.log('data updated');
        res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
});

//delete person
router.delete("/:id", async (req, res) => {
    try{
        let pid = req.params.id;
        let response = await Person.findByIdAndDelete(pid);
        if(!response){ return res.status(404).json({error: 'person not found'}) }
        console.log('person deleted');
        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

module.exports = router;