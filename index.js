require('dotenv').config()
console.log(process.env);
const express = require('express');
const app = express();
const all_router = require('./Routes/index.js'); 
const { connect_to_database } = require('./Database/mongodb.js');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser())
app.use(all_router)
// app.get('/checkingServer',SendingMessage_Controller)

connect_to_database();
app.listen(process.env.PORT_NO,()=>{
    console.log(`Server is running at port no: 4000`)
})