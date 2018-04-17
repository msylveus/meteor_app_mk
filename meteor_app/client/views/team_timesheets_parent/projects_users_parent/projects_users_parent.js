Template.TeamTimesheetsParentProjectsUsersParent.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParent.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParent.onRendered(function() {
	Router.go('/team_timesheets_parent/projects_users_parent/team_timesheet_projects_users/projectId/userId');
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TeamTimesheetsParentProjectsUsersParent.events({
	
});

Template.TeamTimesheetsParentProjectsUsersParent.helpers({
	
});
