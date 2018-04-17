var pageSession = new ReactiveDict();

Template.TeamTeamMemberUpdate.onCreated(function() {
	
});

Template.TeamTeamMemberUpdate.onDestroyed(function() {
	
});

Template.TeamTeamMemberUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TeamTeamMemberUpdate.events({
	
});

Template.TeamTeamMemberUpdate.helpers({
	
});

Template.TeamTeamMemberUpdateTeamMemberUpdateForm.onCreated(function() {
	
});

Template.TeamTeamMemberUpdateTeamMemberUpdateForm.onDestroyed(function() {
	
});

Template.TeamTeamMemberUpdateTeamMemberUpdateForm.onRendered(function() {
	

	pageSession.set("teamTeamMemberUpdateTeamMemberUpdateFormInfoMessage", "");
	pageSession.set("teamTeamMemberUpdateTeamMemberUpdateFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.TeamTeamMemberUpdateTeamMemberUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("teamTeamMemberUpdateTeamMemberUpdateFormInfoMessage", "");
		pageSession.set("teamTeamMemberUpdateTeamMemberUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var teamTeamMemberUpdateTeamMemberUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(teamTeamMemberUpdateTeamMemberUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("teamTeamMemberUpdateTeamMemberUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("team", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("teamTeamMemberUpdateTeamMemberUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("projectsUpdate", t.data.project._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("team", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.TeamTeamMemberUpdateTeamMemberUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("teamTeamMemberUpdateTeamMemberUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("teamTeamMemberUpdateTeamMemberUpdateFormErrorMessage");
	}
	
});
