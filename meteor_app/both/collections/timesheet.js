this.Timesheet = new Mongo.Collection("timesheet");

this.Timesheet.userCanInsert = function(userId, doc) {
	return true;
};

this.Timesheet.userCanUpdate = function(userId, doc) {
	return true;
};

this.Timesheet.userCanRemove = function(userId, doc) {
	return true;
};
