const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MonGoDB Data base connected")
    } catch (error) {
        console.log("Data base connection failed", error)
    }
}

module.exports = connectDB