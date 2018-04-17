var pageSession = new ReactiveDict();



Template.EmploeeList.events({
	"click .btn.btn-primary": function(e, t) {
		Router.go("/projects");
	}
});

Template.EmploeeList.helpers({

});
var EmploeeListNewDataViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("EmploeeListNewDataViewSearchString");
	var sortBy = pageSession.get("EmploeeListNewDataViewSortBy");
	var sortAscending = pageSession.get("EmploeeListNewDataViewSortAscending");
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

var EmploeeListNewDataViewExport = function(cursor, fileType) {
	var data = EmploeeListNewDataViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.EmploeeListNewDataView.onCreated(function() {
	
});

Template.EmploeeListNewDataView.onDestroyed(function() {
	
});

Template.EmploeeListNewDataView.onRendered(function() {
	pageSession.set("EmploeeListNewDataViewStyle", "table");
	
});

Template.EmploeeListNewDataView.events({
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
				pageSession.set("EmploeeListNewDataViewSearchString", searchString);
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
					pageSession.set("EmploeeListNewDataViewSearchString", searchString);
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
					pageSession.set("EmploeeListNewDataViewSearchString", "");
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
		EmploeeListNewDataViewExport(this.project_users_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		EmploeeListNewDataViewExport(this.project_users_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		EmploeeListNewDataViewExport(this.project_users_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		EmploeeListNewDataViewExport(this.project_users_list, "json");
	}

	
});

Template.EmploeeListNewDataView.helpers({

	"insertButtonClass": function() {
		return ProjectUsers.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.project_users_list || this.project_users_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.project_users_list && this.project_users_list.count() > 0;
	},
	"isNotFound": function() {
		return this.project_users_list && pageSession.get("EmploeeListNewDataViewSearchString") && EmploeeListNewDataViewItems(this.project_users_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("EmploeeListNewDataViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("EmploeeListNewDataViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("EmploeeListNewDataViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("EmploeeListNewDataViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("EmploeeListNewDataViewStyle") == "gallery";
	}

	
});


Template.EmploeeListNewDataViewTable.onCreated(function() {
	
});

Template.EmploeeListNewDataViewTable.onDestroyed(function() {
	
});

Template.EmploeeListNewDataViewTable.onRendered(function() {
	
});

Template.EmploeeListNewDataViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("EmploeeListNewDataViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("EmploeeListNewDataViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("EmploeeListNewDataViewSortAscending") || false;
			pageSession.set("EmploeeListNewDataViewSortAscending", !sortAscending);
		} else {
			pageSession.set("EmploeeListNewDataViewSortAscending", true);
		}
	}
});

Template.EmploeeListNewDataViewTable.helpers({
	"tableItems": function() {
		return EmploeeListNewDataViewItems(this.project_users_list);
	}
});


Template.EmploeeListNewDataViewTableItems.onCreated(function() {
	
});

Template.EmploeeListNewDataViewTableItems.onDestroyed(function() {
	
});

Template.EmploeeListNewDataViewTableItems.onRendered(function() {
	
});

Template.EmploeeListNewDataViewTableItems.events({
	

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

Template.EmploeeListNewDataViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return ProjectUsers.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ProjectUsers.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
