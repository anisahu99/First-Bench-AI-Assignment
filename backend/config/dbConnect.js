// make db connection
const mongoose = require('mongoose');

const mongoDBConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connect');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process if MongoDB connection fails
    }
}

module.exports = mongoDBConnection;