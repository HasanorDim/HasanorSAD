
const mongoose = require('mongoose');

const dotenv = require('dotenv');

// dotenv.config();
dotenv.config({path:'config.env'});
const MONGODB = process.env.MONGO_URL;
const connectDB = async() => {
    try {
        //Connecting in DB
        const conn = await mongoose.connect( MONGODB );
        console.log(`Mongo DB connected: ${conn.connection.host}`);
        console.log('Success!');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;
 