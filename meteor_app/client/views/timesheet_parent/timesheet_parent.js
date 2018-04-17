Template.TimesheetParent.onCreated(function() {
	
});

Template.TimesheetParent.onDestroyed(function() {
	
});

Template.TimesheetParent.onRendered(function() {
	console.log("Time---",new Date().getTime());

//Getting the current time
Router.go('/timesheet_backup/' + new Date().getTime());
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TimesheetParent.events({
	
});

Template.TimesheetParent.helpers({
	
});
