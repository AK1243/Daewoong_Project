const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true 
    },
    class_enrollment_history: [
      {
        class_id: 
        {
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
        }
      }
    ]
  });

  module.exports = mongoose.model("Student", StudentsSchema);