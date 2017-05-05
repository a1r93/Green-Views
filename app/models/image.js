// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var imageSchema = mongoose.Schema({
    name: {type:String, default:''}
});

module.exports = mongoose.model('Image', imageSchema);
