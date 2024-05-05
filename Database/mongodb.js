const mongoose = require('mongoose');

const connect_to_database = () => {
    mongoose.connect(process.env.MONGODBURL);

    mongoose.connection.on('connected',()=> {
        console.log("Connected to Database!");
    })
    mongoose.connection.on('error', ()=> {
        console.log("Error connection on Database!");
    })
}
module.exports = {connect_to_database}