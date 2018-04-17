var pageSession = new ReactiveDict();

Template.ReportsReportByProjectAndUser.onCreated(function() {
	
});

Template.ReportsReportByProjectAndUser.onDestroyed(function() {
	
});

Template.ReportsReportByProjectAndUser.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ReportsReportByProjectAndUser.events({
	
});

Template.ReportsReportByProjectAndUser.helpers({
	
});



Template.ReportsReportByProjectAndUserProjectUserCustomComponent.events({

});

Template.ReportsReportByProjectAndUserProjectUserCustomComponent.helpers({

});
var ReportsReportByProjectAndUserProjectUserDataViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ReportsReportByProjectAndUserProjectUserDataViewSearchString");
	var sortBy = pageSession.get("ReportsReportByProjectAndUserProjectUserDataViewSortBy");
	var sortAscending = pageSession.get("ReportsReportByProjectAndUserProjectUserDataViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "supervisor", "user.profile.name", "users", "clientName", "budget"];
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

var ReportsReportByProjectAndUserProjectUserDataViewExport = function(cursor, fileType) {
	var data = ReportsReportByProjectAndUserProjectUserDataViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.ReportsReportByProjectAndUserProjectUserDataView.onCreated(function() {
	
});

Template.ReportsReportByProjectAndUserProjectUserDataView.onDestroyed(function() {
	
});

Template.ReportsReportByProjectAndUserProjectUserDataView.onRendered(function() {
	pageSession.set("ReportsReportByProjectAndUserProjectUserDataViewStyle", "table");
	
});

Template.ReportsReportByProjectAndUserProjectUserDataView.events({
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
				pageSession.set("ReportsReportByProjectAndUserProjectUserDataViewSearchString", searchString);
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
					pageSession.set("ReportsReportByProjectAndUserProjectUserDataViewSearchString", searchString);
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
					pageSession.set("ReportsReportByProjectAndUserProjectUserDataViewSearchString", "");
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
		ReportsReportByProjectAndUserProjectUserDataViewExport(this.project_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ReportsReportByProjectAndUserProjectUserDataViewExport(this.project_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ReportsReportByProjectAndUserProjectUserDataViewExport(this.project_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ReportsReportByProjectAndUserProjectUserDataViewExport(this.project_list, "json");
	}

	
});

Template.ReportsReportByProjectAndUserProjectUserDataView.helpers({

	"insertButtonClass": function() {
		return Projects.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.project_list || this.project_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.project_list && this.project_list.count() > 0;
	},
	"isNotFound": function() {
		return this.project_list && pageSession.get("ReportsReportByProjectAndUserProjectUserDataViewSearchString") && ReportsReportByProjectAndUserProjectUserDataViewItems(this.project_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ReportsReportByProjectAndUserProjectUserDataViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ReportsReportByProjectAndUserProjectUserDataViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ReportsReportByProjectAndUserProjectUserDataViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ReportsReportByProjectAndUserProjectUserDataViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ReportsReportByProjectAndUserProjectUserDataViewStyle") == "gallery";
	}

	
});


Template.ReportsReportByProjectAndUserProjectUserDataViewTable.onCreated(function() {
	
});

Template.ReportsReportByProjectAndUserProjectUserDataViewTable.onDestroyed(function() {
	
});

Template.ReportsReportByProjectAndUserProjectUserDataViewTable.onRendered(function() {
	
});

Template.ReportsReportByProjectAndUserProjectUserDataViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ReportsReportByProjectAndUserProjectUserDataViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ReportsReportByProjectAndUserProjectUserDataViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ReportsReportByProjectAndUserProjectUserDataViewSortAscending") || false;
			pageSession.set("ReportsReportByProjectAndUserProjectUserDataViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ReportsReportByProjectAndUserProjectUserDataViewSortAscending", true);
		}
	}
});

Template.ReportsReportByProjectAndUserProjectUserDataViewTable.helpers({
	"tableItems": function() {
		return ReportsReportByProjectAndUserProjectUserDataViewItems(this.project_list);
	}
});


Template.ReportsReportByProjectAndUserProjectUserDataViewTableItems.onCreated(function() {
	
});

Template.ReportsReportByProjectAndUserProjectUserDataViewTableItems.onDestroyed(function() {
	
});

Template.ReportsReportByProjectAndUserProjectUserDataViewTableItems.onRendered(function() {
	
});

Template.ReportsReportByProjectAndUserProjectUserDataViewTableItems.events({
	

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

		Meteor.call("projectsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("projectsRemove", me._id, function(err, res) {
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

Template.ReportsReportByProjectAndUserProjectUserDataViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Projects.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Projects.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
