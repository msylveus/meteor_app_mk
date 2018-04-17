Template.TeamTimesheetsParentProjectsParent.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsParent.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsParent.onRendered(function() {
	Router.go('/team_timesheets_parent/projects_parent/team_timesheet_project/projectId');
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TeamTimesheetsParentProjectsParent.events({
	
});

Template.TeamTimesheetsParentProjectsParent.helpers({
	
});
