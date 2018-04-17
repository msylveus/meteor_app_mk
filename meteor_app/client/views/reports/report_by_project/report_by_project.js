var pageSession = new ReactiveDict();

Template.ReportsReportByProject.onCreated(function() {
	
});

Template.ReportsReportByProject.onDestroyed(function() {
	
});

Template.ReportsReportByProject.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ReportsReportByProject.events({
	
});

Template.ReportsReportByProject.helpers({
	
});



Template.ReportsReportByProjectProjectCustomComponent.events({

});

Template.ReportsReportByProjectProjectCustomComponent.helpers({

});
var ReportsReportByProjectProjectDataViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ReportsReportByProjectProjectDataViewSearchString");
	var sortBy = pageSession.get("ReportsReportByProjectProjectDataViewSortBy");
	var sortAscending = pageSession.get("ReportsReportByProjectProjectDataViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "nameL", "email", "address", "salary", "jobTitle", "projects"];
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

var ReportsReportByProjectProjectDataViewExport = function(cursor, fileType) {
	var data = ReportsReportByProjectProjectDataViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.ReportsReportByProjectProjectDataView.onCreated(function() {
	
});

Template.ReportsReportByProjectProjectDataView.onDestroyed(function() {
	
});

Template.ReportsReportByProjectProjectDataView.onRendered(function() {
	pageSession.set("ReportsReportByProjectProjectDataViewStyle", "table");
	
});

Template.ReportsReportByProjectProjectDataView.events({
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
				pageSession.set("ReportsReportByProjectProjectDataViewSearchString", searchString);
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
					pageSession.set("ReportsReportByProjectProjectDataViewSearchString", searchString);
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
					pageSession.set("ReportsReportByProjectProjectDataViewSearchString", "");
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
		ReportsReportByProjectProjectDataViewExport(this.admin_users, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ReportsReportByProjectProjectDataViewExport(this.admin_users, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ReportsReportByProjectProjectDataViewExport(this.admin_users, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ReportsReportByProjectProjectDataViewExport(this.admin_users, "json");
	}

	
});

Template.ReportsReportByProjectProjectDataView.helpers({

	

	"isEmpty": function() {
		return !this.admin_users || this.admin_users.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_users && this.admin_users.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_users && pageSession.get("ReportsReportByProjectProjectDataViewSearchString") && ReportsReportByProjectProjectDataViewItems(this.admin_users).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ReportsReportByProjectProjectDataViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ReportsReportByProjectProjectDataViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ReportsReportByProjectProjectDataViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ReportsReportByProjectProjectDataViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ReportsReportByProjectProjectDataViewStyle") == "gallery";
	}

	
});


Template.ReportsReportByProjectProjectDataViewTable.onCreated(function() {
	
});

Template.ReportsReportByProjectProjectDataViewTable.onDestroyed(function() {
	
});

Template.ReportsReportByProjectProjectDataViewTable.onRendered(function() {
	
});

Template.ReportsReportByProjectProjectDataViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ReportsReportByProjectProjectDataViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ReportsReportByProjectProjectDataViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ReportsReportByProjectProjectDataViewSortAscending") || false;
			pageSession.set("ReportsReportByProjectProjectDataViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ReportsReportByProjectProjectDataViewSortAscending", true);
		}
	}
});

Template.ReportsReportByProjectProjectDataViewTable.helpers({
	"tableItems": function() {
		return ReportsReportByProjectProjectDataViewItems(this.admin_users);
	}
});


Template.ReportsReportByProjectProjectDataViewTableItems.onCreated(function() {
	
});

Template.ReportsReportByProjectProjectDataViewTableItems.onDestroyed(function() {
	
});

Template.ReportsReportByProjectProjectDataViewTableItems.onRendered(function() {
	
});

Template.ReportsReportByProjectProjectDataViewTableItems.events({
	

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

		Meteor.call("usersUpdate", this._id, values, function(err, res) {
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
						Meteor.call("usersRemove", me._id, function(err, res) {
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

Template.ReportsReportByProjectProjectDataViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});
