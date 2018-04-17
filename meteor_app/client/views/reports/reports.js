var pageSession = new ReactiveDict();

Template.Reports.onCreated(function() {
	
});

Template.Reports.onDestroyed(function() {
	
});

Template.Reports.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Reports.events({
	
});

Template.Reports.helpers({
	
});

Template.ReportsReportsHomeForm.onCreated(function() {
	
});

Template.ReportsReportsHomeForm.onDestroyed(function() {
	
});

Template.ReportsReportsHomeForm.onRendered(function() {
	

	pageSession.set("reportsReportsHomeFormInfoMessage", "");
	pageSession.set("reportsReportsHomeFormErrorMessage", "");

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

Template.ReportsReportsHomeForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsReportsHomeFormInfoMessage", "");
		pageSession.set("reportsReportsHomeFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var reportsReportsHomeFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(reportsReportsHomeFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsReportsHomeFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsReportsHomeFormErrorMessage", message);
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

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ReportsReportsHomeForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsReportsHomeFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsReportsHomeFormErrorMessage");
	}
	
});
