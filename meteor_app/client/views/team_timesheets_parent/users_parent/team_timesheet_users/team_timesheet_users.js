var pageSession = new ReactiveDict();

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsers.onCreated(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsers.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsers.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsers.events({
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsers.helpers({
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataForm.onCreated(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataForm.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataForm.onRendered(function() {
	

	pageSession.set("teamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataFormInfoMessage", "");
	pageSession.set("teamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataFormErrorMessage", "");

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

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("teamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataFormInfoMessage", "");
		pageSession.set("teamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var teamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(teamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("teamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("teamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataFormErrorMessage", message);
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
  console.log("Printing UserId", userId);
  	pageSession.set("teamEmployeesUID"	, userId);
},
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataForm.helpers({
	"infoMessage": function() {
		return pageSession.get("teamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("teamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataFormErrorMessage");
	}, 
	"viewDate" :function(){
 var transactions = ProjectUsers.find({$or:[
      {supervisorId:this.userId},
      {createdBy:this.userId}
  ]}).fetch();
return _.uniq(transactions, false, function(transaction) {return transaction.supervisordId});
}


});



Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersWeekNav.events({
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
	},

	"click button": function(e, t) {
		console.log("**** Did Select Field", pageSession.get("teamEmployeesUID"));
		Router.go('/team_timesheets_parent/users_parent/team_timesheet_users/' + pageSession.get("teamEmployeesUID"));
		
		//+ "/" + pageSession.get("teamEmployeesUID")
		
		//team_timesheets_parent/users_parent/team_timesheet_users/userId
	}
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersWeekNav.helpers({

});
var TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSearchString");
	var sortBy = pageSession.get("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSortBy");
	var sortAscending = pageSession.get("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["project_id", "project.projectTitle", "user.profile.name", "date", "from_time", "to_time", "totalHrs", "firstDayOfWeek", "lastDayOfWeek", "userId"];
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

var TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewExport = function(cursor, fileType) {
	var data = TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataView.onCreated(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataView.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataView.onRendered(function() {
	pageSession.set("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewStyle", "table");
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataView.events({
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
				pageSession.set("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSearchString", searchString);
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
					pageSession.set("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSearchString", searchString);
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
					pageSession.set("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSearchString", "");
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
		TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewExport(this.team_timesheets_by_users, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewExport(this.team_timesheets_by_users, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewExport(this.team_timesheets_by_users, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewExport(this.team_timesheets_by_users, "json");
	}

	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataView.helpers({

	"insertButtonClass": function() {
		return Timesheet.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.team_timesheets_by_users || this.team_timesheets_by_users.count() == 0;
	},
	"isNotEmpty": function() {
		return this.team_timesheets_by_users && this.team_timesheets_by_users.count() > 0;
	},
	"isNotFound": function() {
		return this.team_timesheets_by_users && pageSession.get("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSearchString") && TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewItems(this.team_timesheets_by_users).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewStyle") == "gallery";
	}

	
});


Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewTable.onCreated(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewTable.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewTable.onRendered(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSortAscending") || false;
			pageSession.set("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewSortAscending", true);
		}
	}
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewTable.helpers({
	"tableItems": function() {
		return TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewItems(this.team_timesheets_by_users);
	}
});


Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewTableItems.onCreated(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewTableItems.onDestroyed(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewTableItems.onRendered(function() {
	
});

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewTableItems.events({
	

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

Template.TeamTimesheetsParentUsersParentTeamTimesheetUsersByUsersDataViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Timesheet.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Timesheet.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
