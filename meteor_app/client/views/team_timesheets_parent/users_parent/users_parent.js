Template.TeamTimesheetsParentUsersParent.onCreated(function() {
	
});

Template.TeamTimesheetsParentUsersParent.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentUsersParent.onRendered(function() {
	Router.go('/team_timesheets_parent/users_parent/team_timesheet_users/userId');
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TeamTimesheetsParentUsersParent.events({
	
});

Template.TeamTimesheetsParentUsersParent.helpers({
	
});
