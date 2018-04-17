Template.TeamTimesheetsParent.onCreated(function() {
	
});

Template.TeamTimesheetsParent.onDestroyed(function() {
	
});

Template.TeamTimesheetsParent.onRendered(function() {
	//Router.go('/team_timesheets_parent/team_timesheets_child/projectId');


	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TeamTimesheetsParent.events({
	
});

Template.TeamTimesheetsParent.helpers({
	
});

Template.TeamTimesheetsParentSideMenu.onCreated(function() {
	
});

Template.TeamTimesheetsParentSideMenu.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentSideMenu.onRendered(function() {
	$(".menu-item-collapse .dropdown-toggle").each(function() {
		if($(this).find("li.active")) {
			$(this).removeClass("collapsed");
		}
		$(this).parent().find(".collapse").each(function() {
			if($(this).find("li.active").length) {
				$(this).addClass("in");
			}
		});
	});
	
});

Template.TeamTimesheetsParentSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.TeamTimesheetsParentSideMenu.helpers({
	
});
