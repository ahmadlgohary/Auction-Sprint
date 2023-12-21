//Import MongoDB
const mongoose = require("mongoose")

// Make a Model for items_collection DB 
mongoose.model("items_collection",{
    //name, category, seller, highestBid(mostRecentBid)
    name:{
        type: String,
        require: true
    }, 
    category:{
        type: String,
        require: true
    }, 
    seller:{
        type: String,
        require: true
    }, 
    highestBid:{
        type: Number,
        require: true
    }
})
