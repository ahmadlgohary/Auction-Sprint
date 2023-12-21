//import Express.JS
const express = require("express");
const app = express();

//Import Mongoose for MongoDB
const mongoose =  require("mongoose")
mongoose.connect("mongodb+srv://ahmad:lu52b3oPHwCvDRQK@auctionsprint.bs0mrhm.mongodb.net/ItemsDB?retryWrites=true&w=majority")

//Import itemModel.js
require("./itemModel")

//Import the model from itemModel.js 
const Item_Model = mongoose.model("items_collection")

//Import Body Parser
const bodyParser = require("body-parser")
app.use(bodyParser.json())


//create host
app.get('/',(req,res)=>{
    res.send("This is our main end point")
})


//open express server
app.listen(5500, ()=>{
    console.log("Connected")
})




//Create an Item
app.post("/item", (req, res)=>{
    let newItem = {
        "name"          :   req['body']['name'], 
        "category"      :   req['body']['category'], 
        "seller"        :   req['body']['seller'], 
        "highestBid"    :   req['body']['highestBid']
    }
    let item = new Item_Model(newItem)
    
    item.save().then(()=>{
        console.log("new item Created")
    }).catch(err =>{
        if(err){
            throw err
        }
    })
    res.send("successfully created new item ")
})


//Read All Items
app.get("/items",(req,res)=>{
    Item_Model.find().then((items)=>{
        res.json(items)
    }).catch(err =>{
        if(err){
            throw err
        }
    })
})


//Read 1 Item
/*
app.get("/item/:id",(req,res)=>{
    Item_Model.findById(req.params.id).then((item)=>{
        res.json(item)
    }).catch(err =>{
        if(err){
            res.sendFile(__dirname+"/404.html")
        }
    })
})
*/
app.get("/item/:id", async (req, res) => { //< Marks the callback as async
    try{
        const item = await Item_Model.findById(req.params.id);      //< Use of await keyword
        if(!item){                                                  //< item will be null if no matches in database
            return res.status(400).sendFile(__dirname+"/404.html")  //invalid id //return res.status(400).json({message: 'No Item found'})
        }     
        return res.status(200).json({
            item: item
        });
    } catch(err){
        //console.log(err); //< Log the actual error so you can check
        return res.status(500).sendFile(__dirname+"/404.html"); //invalid id less than 26 char
        // i want to send a message to html error page and redirect them to it 
    }
});


//Delete an Item
app.delete("/item/:id",(req,res)=>{
    Item_Model.findOneAndDelete(req.params.id).then((item)=>{
        console.log(item)
        res.send("Item Successfully Removed")
    }).catch(err =>{
        if(err){
            console.log(err);
        }
    })
})


//Redirect If page Doesn't exist
app.get("*",(req,res)=>{
    res.sendFile(__dirname+"/404.html")
            })   