var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Host = new Schema({
	long: ''
});
 
var Host = module.exports = mongoose.model('Host', Host);