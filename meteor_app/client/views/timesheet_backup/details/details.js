var pageSession = new ReactiveDict();

Template.TimesheetBackupDetails.onCreated(function() {
	
});

Template.TimesheetBackupDetails.onDestroyed(function() {
	
});

Template.TimesheetBackupDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TimesheetBackupDetails.events({
	
});

Template.TimesheetBackupDetails.helpers({
	
});

Template.TimesheetBackupDetailsForm.onCreated(function() {
	
});

Template.TimesheetBackupDetailsForm.onDestroyed(function() {
	
});

Template.TimesheetBackupDetailsForm.onRendered(function() {
	

	pageSession.set("timesheetBackupDetailsFormInfoMessage", "");
	pageSession.set("timesheetBackupDetailsFormErrorMessage", "");

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

Template.TimesheetBackupDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("timesheetBackupDetailsFormInfoMessage", "");
		pageSession.set("timesheetBackupDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var timesheetBackupDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(timesheetBackupDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("timesheetBackupDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("timesheetBackupDetailsFormErrorMessage", message);
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

		Router.go("timesheet_backup", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("timesheet_backup", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.TimesheetBackupDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("timesheetBackupDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("timesheetBackupDetailsFormErrorMessage");
	}
	
});
