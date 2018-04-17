Template.Admin.onCreated(function() {
	
});

Template.Admin.onDestroyed(function() {
	
});

Template.Admin.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Admin.events({
	
});

Template.Admin.helpers({
	
});
