
const mongoose = require('mongoose'); 
var schema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true     
    }
});

const userDb = mongoose.model('adminuser', schema);
module.exports = userDb;

