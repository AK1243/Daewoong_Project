const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassesSchema = new Schema({
    subject_id: {
        type: String,
        required: true 
    },
    teacher_id: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true 
    },
    year: {
        type: Number,
        required: true
    },
    student_ids: [
        {
            type: String,
            required: true
        }
    ]
})

module.exports = mongoose.model("Class", ClassesSchema);