Template.Team.onCreated(function() {
	
});

Template.Team.onDestroyed(function() {
	
});

Template.Team.onRendered(function() {
	Router.go('/team/team_users/abcd');
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Team.events({
	
});

Template.Team.helpers({
	
});
