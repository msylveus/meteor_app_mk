var pageSession = new ReactiveDict();

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsers.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsers.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsers.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsers.events({
	

});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsers.helpers({
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataForm.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataForm.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataForm.onRendered(function() {
	

	pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormInfoMessage", "");
	pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormErrorMessage", "");

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

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormInfoMessage", "");
		pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormErrorMessage", message);
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
	}, 

	"change #team_timesheet_proj_select": function (event, template) {
  	var projectId = $(event.currentTarget).val();
  	pageSession.set("teamEmployeesPID"	, projectId);
   	Router.go('/team_timesheets_parent/projects_users_parent/team_timesheet_projects_users/' + pageSession.get("teamEmployeesPID") + "/" + "bcks" );
}, 

  
  //Router.go('/team_timesheets_parent/projects_users_parent/team_timesheet_projects_users/' + pageSession.get("teamEmployeesPID") + "/" + pageSession.get("teamEmployeesUID"));
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataForm.helpers({
	"infoMessage": function() {
		return pageSession.get("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormErrorMessage");
	}
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersForm.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersForm.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersForm.onRendered(function() {
	

	pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersFormInfoMessage", "");
	pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersFormErrorMessage", "");

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

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersFormInfoMessage", "");
		pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersFormErrorMessage", message);
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
	}, 

	"change #team_timesheet_member_select": function (event, template) {
  	var userId = $(event.currentTarget).val();
  	pageSession.set("teamEmployeesUID"	, userId);
  	Router.go('/team_timesheets_parent/projects_users_parent/team_timesheet_projects_users/' + pageSession.get("teamEmployeesPID") + "/" + pageSession.get("teamEmployeesUID"));
}
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersForm.helpers({
	"infoMessage": function() {
		return pageSession.get("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("teamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataFormUsersFormErrorMessage");
	}
	
});



Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersWeekNav.events({
	"click .previousBtn.fa.fa-arrow-circle-left": function(e, t) {
		//604800000
		console.log(Router.current().params.selectedDate);
		var param = (+ Router.current().params.selectedDate) - 604800000;
		console.log(param);
		
		Router.go('/timesheet_backup/' + param);
	},

	"click .nextBtn.fa.fa-arrow-circle-right": function(e, t) {
		//604800000
		console.log(Router.current().params.selectedDate);
		var param = (+ Router.current().params.selectedDate) + 604800000;
		console.log(param);
		
		Router.go('/timesheet_backup/' + param);
	}
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersWeekNav.helpers({

});
var TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSearchString");
	var sortBy = pageSession.get("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSortBy");
	var sortAscending = pageSession.get("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["project_id", "project.title", "user.profile.name", "date", "from_time", "to_time", "totalHrs", "firstDayOfWeek", "lastDayOfWeek", "userId", "projectId"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewExport = function(cursor, fileType) {
	var data = TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataView.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataView.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataView.onRendered(function() {
	pageSession.set("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewStyle", "table");
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewExport(this.team_timesheets_by_proj_users, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewExport(this.team_timesheets_by_proj_users, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewExport(this.team_timesheets_by_proj_users, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewExport(this.team_timesheets_by_proj_users, "json");
	}

	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataView.helpers({

	"insertButtonClass": function() {
		return Timesheet.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.team_timesheets_by_proj_users || this.team_timesheets_by_proj_users.count() == 0;
	},
	"isNotEmpty": function() {
		return this.team_timesheets_by_proj_users && this.team_timesheets_by_proj_users.count() > 0;
	},
	"isNotFound": function() {
		return this.team_timesheets_by_proj_users && pageSession.get("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSearchString") && TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewItems(this.team_timesheets_by_proj_users).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewStyle") == "gallery";
	}

	
});


Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewTable.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewTable.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewTable.onRendered(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSortAscending") || false;
			pageSession.set("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewSortAscending", true);
		}
	}
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewTable.helpers({
	"tableItems": function() {
		return TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewItems(this.team_timesheets_by_proj_users);
	}
});


Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewTableItems.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewTableItems.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewTableItems.onRendered(function() {
	
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("timesheetUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("timesheetRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	}
});

Template.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersByProjectsUsersDataViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Timesheet.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Timesheet.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
