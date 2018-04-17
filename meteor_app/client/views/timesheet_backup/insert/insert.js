var pageSession = new ReactiveDict();

Template.TimesheetBackupInsert.onCreated(function() {
	
});

Template.TimesheetBackupInsert.onDestroyed(function() {
	
});

Template.TimesheetBackupInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TimesheetBackupInsert.events({
	
});

Template.TimesheetBackupInsert.helpers({
	
});

Template.TimesheetBackupInsertForm.onCreated(function() {
	
});

Template.TimesheetBackupInsertForm.onDestroyed(function() {
	
});

Template.TimesheetBackupInsertForm.onRendered(function() {
	

	pageSession.set("timesheetBackupInsertFormInfoMessage", "");
	pageSession.set("timesheetBackupInsertFormErrorMessage", "");

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

Template.TimesheetBackupInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("timesheetBackupInsertFormInfoMessage", "");
		pageSession.set("timesheetBackupInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var timesheetBackupInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(timesheetBackupInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("timesheetBackupInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("timesheet_backup", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("timesheetBackupInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("timesheetInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.TimesheetBackupInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("timesheetBackupInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("timesheetBackupInsertFormErrorMessage");
	}
	
});
