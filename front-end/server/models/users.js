var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	id: String,
	team_id: String,
	name: String,
	deleted: Boolean,
	color: String,
	real_name: String,
	tz: String,
	tz_label: String,
	tz_offset: Number,
	profile: [Object],
	is_admin: Boolean,
	is_owner: Boolean,
	is_primary_owner: Boolean,
	is_restricted: Boolean,
	is_ultra_restricted: Boolean,
	is_bot: Boolean,
	is_app_user: Boolean,
	updated: Number
});
 
var User = module.exports = mongoose.model('User', User);