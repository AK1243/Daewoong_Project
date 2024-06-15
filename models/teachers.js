const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeachersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subjectsTaught: [
        {
            type: String,
            required: true
        }
    ]
})

module.exports = mongoose.model("Teacher", TeachersSchema);