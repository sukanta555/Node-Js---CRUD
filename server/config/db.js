/*const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB =async()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected: ${conn.connection.host}`);

    }catch(error){
        console.log(error);
    }
}
module.exports = connectDB;*/


const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/NodeJs_User_Management'; // Replace with your database URI

//mongoose.set('strictQuery', false);

mongoose.connect(mongoURL)
    .then(() => {
        console.log('Connected to local MongoDB server');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database disconnection
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
