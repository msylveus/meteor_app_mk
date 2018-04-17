var pageSession = new ReactiveDict();

Template.ProjectsDetails.onCreated(function() {
	
});

Template.ProjectsDetails.onDestroyed(function() {
	
});

Template.ProjectsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProjectsDetails.events({
	
});

Template.ProjectsDetails.helpers({
	
});

Template.ProjectsDetailsForm.onCreated(function() {
	
});

Template.ProjectsDetailsForm.onDestroyed(function() {
	
});

Template.ProjectsDetailsForm.onRendered(function() {
	

	pageSession.set("projectsDetailsFormInfoMessage", "");
	pageSession.set("projectsDetailsFormErrorMessage", "");

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

Template.ProjectsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("projectsDetailsFormInfoMessage", "");
		pageSession.set("projectsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var projectsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(projectsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("projectsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("projectsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("projects", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("projects", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ProjectsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("projectsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("projectsDetailsFormErrorMessage");
	}
	
});
