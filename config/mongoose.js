//  require the liberary
const mongoose = require('mongoose');

//  connect to the datasbase
mongoose.connect('mongodb+srv://aditya:aditya123@cluster0.7kvvg.mongodb.net/contact_list_db');

// acquire the connection ( to check if it susccessfull )
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the message
db.once('open' , ()=>{
    console.log('successfully connexted to database')
})
