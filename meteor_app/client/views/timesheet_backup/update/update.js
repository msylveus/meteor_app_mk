var pageSession = new ReactiveDict();

Template.TimesheetBackupUpdate.onCreated(function() {
	
});

Template.TimesheetBackupUpdate.onDestroyed(function() {
	
});

Template.TimesheetBackupUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TimesheetBackupUpdate.events({
	
});

Template.TimesheetBackupUpdate.helpers({
	
});

Template.TimesheetBackupUpdateForm.onCreated(function() {
	
});

Template.TimesheetBackupUpdateForm.onDestroyed(function() {
	
});

Template.TimesheetBackupUpdateForm.onRendered(function() {
	

	pageSession.set("timesheetBackupUpdateFormInfoMessage", "");
	pageSession.set("timesheetBackupUpdateFormErrorMessage", "");

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

Template.TimesheetBackupUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("timesheetBackupUpdateFormInfoMessage", "");
		pageSession.set("timesheetBackupUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var timesheetBackupUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(timesheetBackupUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("timesheetBackupUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("timesheet_backup", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("timesheetBackupUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("timesheetUpdate", t.data.timesheet_backups._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("timesheet_backup", mergeObjects(Router.currentRouteParams(), {}));
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

Template.TimesheetBackupUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("timesheetBackupUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("timesheetBackupUpdateFormErrorMessage");
	}
	
});
