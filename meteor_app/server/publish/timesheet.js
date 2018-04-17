Meteor.publish("timesheet_backups_list", function(selectedDate) {
	return Timesheet.publishJoinedCursors(Timesheet.find({$and:[{firstDayOfWeek:{$lte:selectedDate}},{lastDayOfWeek:{$gte:selectedDate}},{userId:this.userId}]}, {sort:[["date","desc"]]}));
});

Meteor.publish("timesheet_backup_null", function() {
	return Timesheet.publishJoinedCursors(Timesheet.find({_id:null}, {}));
});

Meteor.publish("timesheet_backups", function(timesheetBackupsId) {
	return Timesheet.publishJoinedCursors(Timesheet.find({_id:timesheetBackupsId}, {sort:[["date","desc"]]}));
});

Meteor.publish("team_timesheets_by_proj", function(projectId) {
	return Timesheet.publishJoinedCursors(Timesheet.find({project_id:projectId}, {sort:["date"]}));
});

Meteor.publish("team_timesheets_by_users", function(userId) {
	return Timesheet.publishJoinedCursors(Timesheet.find({userId:userId}, {sort:["date"]}));
});

Meteor.publish("team_timesheets_by_proj_users", function(projectId, userId) {
	return Timesheet.publishJoinedCursors(Timesheet.find({$and:[{project_id:projectId},{userId:userId}]}, {sort:["date"]}));
});

Meteor.publish("report_by_proj", function() {
	return Timesheet.publishJoinedCursors(Timesheet.find({}, {}));
});

