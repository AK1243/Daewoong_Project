const mongoose = require("mongoose");
const URI = "mongodb+srv://adityakamarthi:hello123@cluster0.aly909j.mongodb.net/"

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log("database successfully connected")
}

module.exports = connectDB;