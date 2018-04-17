var pageSession = new ReactiveDict();

Template.TimesheetBackup.onCreated(function() {
	
});

Template.TimesheetBackup.onDestroyed(function() {
	
});

Template.TimesheetBackup.onRendered(function() {
	//console.log(Router.current().params.selectedDate);
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.TimesheetBackup.events({
	
});

Template.TimesheetBackup.helpers({
	
});



Template.TimesheetBackupWeekNavigation.events({
	"click .nextBtn.fa.fa-arrow-circle-right": function(e, t) {
		//604800000
		console.log(Router.current().params.selectedDate);
		var param = (+ Router.current().params.selectedDate) + 604800000;
		console.log(param);
		
		Router.go('/timesheet_backup/' + param);
	},

	"click .previousBtn.fa.fa-arrow-circle-left": function(e, t) {
		//604800000
		console.log(Router.current().params.selectedDate);
		var param = (+ Router.current().params.selectedDate) - 604800000;
		console.log(param);
		
		Router.go('/timesheet_backup/' + param);
	}
});

Template.TimesheetBackupWeekNavigation.helpers({

});
var TimesheetBackupViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TimesheetBackupViewSearchString");
	var sortBy = pageSession.get("TimesheetBackupViewSortBy");
	var sortAscending = pageSession.get("TimesheetBackupViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["project_id", "project.title", "date", "from_time", "to_time", "totalHrs"];
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

var TimesheetBackupViewExport = function(cursor, fileType) {
	var data = TimesheetBackupViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.TimesheetBackupView.onCreated(function() {
	
});

Template.TimesheetBackupView.onDestroyed(function() {
	
});

Template.TimesheetBackupView.onRendered(function() {
	pageSession.set("TimesheetBackupViewStyle", "table");
	
});

Template.TimesheetBackupView.events({
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
				pageSession.set("TimesheetBackupViewSearchString", searchString);
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
					pageSession.set("TimesheetBackupViewSearchString", searchString);
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
					pageSession.set("TimesheetBackupViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("timesheet_backup.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		TimesheetBackupViewExport(this.timesheet_backups_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TimesheetBackupViewExport(this.timesheet_backups_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TimesheetBackupViewExport(this.timesheet_backups_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TimesheetBackupViewExport(this.timesheet_backups_list, "json");
	}, 

		"click .nextBtn.fa.fa-arrow-circle-right": function(e, t) {
		//604800000
		console.log(Router.current().params.selectedDate);
		var param = (+ Router.current().params.selectedDate) + 604800000;
		console.log(param);
		
		Router.go('/timesheet_backup/' + param);
	},

	"click .previousBtn.fa.fa-arrow-circle-left": function(e, t) {
		//604800000
		console.log(Router.current().params.selectedDate);
		var param = (+ Router.current().params.selectedDate) - 604800000;
		console.log(param);
		
		Router.go('/timesheet_backup/' + param);
	}
});

Template.TimesheetBackupView.helpers({

	"insertButtonClass": function() {
		return Timesheet.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.timesheet_backups_list || this.timesheet_backups_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.timesheet_backups_list && this.timesheet_backups_list.count() > 0;
	},
	"isNotFound": function() {
		return this.timesheet_backups_list && pageSession.get("TimesheetBackupViewSearchString") && TimesheetBackupViewItems(this.timesheet_backups_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TimesheetBackupViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TimesheetBackupViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("TimesheetBackupViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("TimesheetBackupViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TimesheetBackupViewStyle") == "gallery";
	}

	
});


Template.TimesheetBackupViewTable.onCreated(function() {
	
});

Template.TimesheetBackupViewTable.onDestroyed(function() {
	
});

Template.TimesheetBackupViewTable.onRendered(function() {
	
});

Template.TimesheetBackupViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TimesheetBackupViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TimesheetBackupViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TimesheetBackupViewSortAscending") || false;
			pageSession.set("TimesheetBackupViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TimesheetBackupViewSortAscending", true);
		}
	}
});

Template.TimesheetBackupViewTable.helpers({
	"tableItems": function() {
		return TimesheetBackupViewItems(this.timesheet_backups_list);
	}
});


Template.TimesheetBackupViewTableItems.onCreated(function() {
	
});

Template.TimesheetBackupViewTableItems.onDestroyed(function() {
	
});

Template.TimesheetBackupViewTableItems.onRendered(function() {
	
});

Template.TimesheetBackupViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("timesheet_backup.details", mergeObjects(Router.currentRouteParams(), {timesheetBackupsId: this._id}));
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
		Router.go("timesheet_backup.update", mergeObjects(Router.currentRouteParams(), {timesheetBackupsId: this._id}));
		return false;
	}
});

Template.TimesheetBackupViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Timesheet.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Timesheet.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
