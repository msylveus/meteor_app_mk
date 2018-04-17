Timesheet.allow({
	insert: function (userId, doc) {
		return false;
	},

	update: function (userId, doc, fields, modifier) {
		return false;
	},

	remove: function (userId, doc) {
		return false;
	}
});

Timesheet.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
this.args[0].totalHrs = (this.args[0].to_time - this.args[0].from_time) / 60 / 60;
console.log("______selected Date:", this.args[0].date);

//creating a new date from the selected date, for it not to reset the selected date
var curr = new Date(this.args[0].date); 

var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6

//Getting first day of the week starting from 00:00:00(midnight), then converting to string
this.args[0].firstDayOfWeek = "" + new Date(curr.setDate(first)).getTime();

//Adding 23:59 to last day of week before converting to string
var millis = new Date(curr.setDate(last)).getTime() + 86340000;
this.args[0].lastDayOfWeek = "" + millis;

this.args[0].userId = Meteor.userId();

this.args[0].project_id = this.args[0].projectId;

});

Timesheet.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
console.log("Timesheet before update", this.args);
this.args[0].project_id = this.args[0].projectId;
});

Timesheet.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Timesheet.before.remove(function(userId, doc) {
	
});

Timesheet.after.insert(function(userId, doc) {
	
console.log("_________in before insert ",this); 

});

Timesheet.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Timesheet.after.remove(function(userId, doc) {
	
});
