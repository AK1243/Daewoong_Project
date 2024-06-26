const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectsSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    creditHours: { 
        type: Number, 
        required: true 
    }
})

module.exports = mongoose.model("Subject", SubjectsSchema);