var pageSession = new ReactiveDict();

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProject.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProject.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProject.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProject.events({
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProject.helpers({
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectProjectForm.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectProjectForm.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectProjectForm.onRendered(function() {
	

	pageSession.set("teamTimesheetsParentProjectsParentTeamTimesheetProjectProjectFormInfoMessage", "");
	pageSession.set("teamTimesheetsParentProjectsParentTeamTimesheetProjectProjectFormErrorMessage", "");

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

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectProjectForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("teamTimesheetsParentProjectsParentTeamTimesheetProjectProjectFormInfoMessage", "");
		pageSession.set("teamTimesheetsParentProjectsParentTeamTimesheetProjectProjectFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var teamTimesheetsParentProjectsParentTeamTimesheetProjectProjectFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(teamTimesheetsParentProjectsParentTeamTimesheetProjectProjectFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("teamTimesheetsParentProjectsParentTeamTimesheetProjectProjectFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("teamTimesheetsParentProjectsParentTeamTimesheetProjectProjectFormErrorMessage", message);
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
  	console.log("ProjectId....", projectId);
  	pageSession.set("teamEmployeesPID"	, projectId);
  
  	console.log("**** Did Select Field", pageSession.get("teamEmployeesUID"));
	Router.go('/team_timesheets_parent/projects_parent/team_timesheet_project/' + pageSession.get("teamEmployeesPID"));


}
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectProjectForm.helpers({
	"infoMessage": function() {
		return pageSession.get("teamTimesheetsParentProjectsParentTeamTimesheetProjectProjectFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("teamTimesheetsParentProjectsParentTeamTimesheetProjectProjectFormErrorMessage");
	}
	
});



Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectWeekComponent.events({

});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectWeekComponent.helpers({

});
var TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSearchString");
	var sortBy = pageSession.get("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSortBy");
	var sortAscending = pageSession.get("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSortAscending");
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

var TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewExport = function(cursor, fileType) {
	var data = TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataView.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataView.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataView.onRendered(function() {
	pageSession.set("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewStyle", "table");
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataView.events({
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
				pageSession.set("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSearchString", searchString);
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
					pageSession.set("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSearchString", searchString);
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
					pageSession.set("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSearchString", "");
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
		TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewExport(this.team_timesheets_by_proj, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewExport(this.team_timesheets_by_proj, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewExport(this.team_timesheets_by_proj, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewExport(this.team_timesheets_by_proj, "json");
	}

	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataView.helpers({

	"insertButtonClass": function() {
		return Timesheet.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.team_timesheets_by_proj || this.team_timesheets_by_proj.count() == 0;
	},
	"isNotEmpty": function() {
		return this.team_timesheets_by_proj && this.team_timesheets_by_proj.count() > 0;
	},
	"isNotFound": function() {
		return this.team_timesheets_by_proj && pageSession.get("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSearchString") && TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewItems(this.team_timesheets_by_proj).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewStyle") == "gallery";
	}

	
});


Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewTable.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewTable.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewTable.onRendered(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSortAscending") || false;
			pageSession.set("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewSortAscending", true);
		}
	}
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewTable.helpers({
	"tableItems": function() {
		return TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewItems(this.team_timesheets_by_proj);
	}
});


Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewTableItems.onCreated(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewTableItems.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewTableItems.onRendered(function() {
	
});

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewTableItems.events({
	

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

Template.TeamTimesheetsParentProjectsParentTeamTimesheetProjectTimeSheetDataViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Timesheet.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Timesheet.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
