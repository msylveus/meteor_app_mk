var pageSession = new ReactiveDict();

Template.TeamTeamUsers.onCreated(function() {
	
});

Template.TeamTeamUsers.onDestroyed(function() {
	
});

Template.TeamTeamUsers.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TeamTeamUsers.events({
	
});

Template.TeamTeamUsers.helpers({
	
});

Template.TeamTeamUsersTeamUsersForm.onCreated(function() {
	
});

Template.TeamTeamUsersTeamUsersForm.onDestroyed(function() {
	
});

Template.TeamTeamUsersTeamUsersForm.onRendered(function() {
	

	pageSession.set("teamTeamUsersTeamUsersFormInfoMessage", "");
	pageSession.set("teamTeamUsersTeamUsersFormErrorMessage", "");

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

Template.TeamTeamUsersTeamUsersForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("teamTeamUsersTeamUsersFormInfoMessage", "");
		pageSession.set("teamTeamUsersTeamUsersFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var teamTeamUsersTeamUsersFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(teamTeamUsersTeamUsersFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("teamTeamUsersTeamUsersFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("teamTeamUsersTeamUsersFormErrorMessage", message);
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

	"change #team_employee-select": function (event, template) {
  	var projectId = $(event.currentTarget).val();
  	pageSession.set("teamEmployeesPID"	, projectId);
	 console.log("**** Did Select Field", pageSession.get("teamEmployeesPID"));
  	Router.go('/team/team_users/' + projectId);
} 


});

Template.TeamTeamUsersTeamUsersForm.helpers({
	"infoMessage": function() {
		return pageSession.get("teamTeamUsersTeamUsersFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("teamTeamUsersTeamUsersFormErrorMessage");
	}
	
});

var TeamTeamUsersTeamUsersDataViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TeamTeamUsersTeamUsersDataViewSearchString");
	var sortBy = pageSession.get("TeamTeamUsersTeamUsersDataViewSortBy");
	var sortAscending = pageSession.get("TeamTeamUsersTeamUsersDataViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["userId", "projectId", "user.profile.name", "user.profile.nameL", "user.profile.email", "supervisorId", "projectTitle"];
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

var TeamTeamUsersTeamUsersDataViewExport = function(cursor, fileType) {
	var data = TeamTeamUsersTeamUsersDataViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.TeamTeamUsersTeamUsersDataView.onCreated(function() {
	
});

Template.TeamTeamUsersTeamUsersDataView.onDestroyed(function() {
	
});

Template.TeamTeamUsersTeamUsersDataView.onRendered(function() {
	pageSession.set("TeamTeamUsersTeamUsersDataViewStyle", "table");
	
});

Template.TeamTeamUsersTeamUsersDataView.events({
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
				pageSession.set("TeamTeamUsersTeamUsersDataViewSearchString", searchString);
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
					pageSession.set("TeamTeamUsersTeamUsersDataViewSearchString", searchString);
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
					pageSession.set("TeamTeamUsersTeamUsersDataViewSearchString", "");
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
		TeamTeamUsersTeamUsersDataViewExport(this.team_employees, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TeamTeamUsersTeamUsersDataViewExport(this.team_employees, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TeamTeamUsersTeamUsersDataViewExport(this.team_employees, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TeamTeamUsersTeamUsersDataViewExport(this.team_employees, "json");
	}

	
});

Template.TeamTeamUsersTeamUsersDataView.helpers({

	"insertButtonClass": function() {
		return ProjectUsers.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.team_employees || this.team_employees.count() == 0;
	},
	"isNotEmpty": function() {
		return this.team_employees && this.team_employees.count() > 0;
	},
	"isNotFound": function() {
		return this.team_employees && pageSession.get("TeamTeamUsersTeamUsersDataViewSearchString") && TeamTeamUsersTeamUsersDataViewItems(this.team_employees).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TeamTeamUsersTeamUsersDataViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TeamTeamUsersTeamUsersDataViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("TeamTeamUsersTeamUsersDataViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("TeamTeamUsersTeamUsersDataViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TeamTeamUsersTeamUsersDataViewStyle") == "gallery";
	}

	
});


Template.TeamTeamUsersTeamUsersDataViewTable.onCreated(function() {
	
});

Template.TeamTeamUsersTeamUsersDataViewTable.onDestroyed(function() {
	
});

Template.TeamTeamUsersTeamUsersDataViewTable.onRendered(function() {
	
});

Template.TeamTeamUsersTeamUsersDataViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TeamTeamUsersTeamUsersDataViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TeamTeamUsersTeamUsersDataViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TeamTeamUsersTeamUsersDataViewSortAscending") || false;
			pageSession.set("TeamTeamUsersTeamUsersDataViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TeamTeamUsersTeamUsersDataViewSortAscending", true);
		}
	}
});

Template.TeamTeamUsersTeamUsersDataViewTable.helpers({
	"tableItems": function() {
		return TeamTeamUsersTeamUsersDataViewItems(this.team_employees);
	}
});


Template.TeamTeamUsersTeamUsersDataViewTableItems.onCreated(function() {
	
});

Template.TeamTeamUsersTeamUsersDataViewTableItems.onDestroyed(function() {
	
});

Template.TeamTeamUsersTeamUsersDataViewTableItems.onRendered(function() {
	
});

Template.TeamTeamUsersTeamUsersDataViewTableItems.events({
	

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

		Meteor.call("projectUsersUpdate", this._id, values, function(err, res) {
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
						Meteor.call("projectUsersRemove", me._id, function(err, res) {
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

Template.TeamTeamUsersTeamUsersDataViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return ProjectUsers.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ProjectUsers.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});



Template.TeamTeamUsersNewCustomComponent.events({
	"click .btn.btn-default": function(e, t) {
		Router.go('/team/team_member_update/' + pageSession.get("teamEmployeesPID"));
	}
});

Template.TeamTeamUsersNewCustomComponent.helpers({

});