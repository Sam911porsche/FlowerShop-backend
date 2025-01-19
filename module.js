const mongoose = require("mongoose")
const flowerSchema = new mongoose.Schema({

    name: { type: String, required: true, trim: true },
      PKR: { type: String, required: true, trim: true },
    image: { type: String, required: true},

}, {timestemp:true});
module.exports = mongoose.model("flower", flowerSchema)
