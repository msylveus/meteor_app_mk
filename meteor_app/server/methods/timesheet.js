Meteor.methods({
	"timesheetInsert": function(data) {
		if(!Timesheet.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Timesheet.insert(data);
	},

	"timesheetUpdate": function(id, data) {
		var doc = Timesheet.findOne({ _id: id });
		if(!Timesheet.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Timesheet.update({ _id: id }, { $set: data });
	},

	"timesheetRemove": function(id) {
		var doc = Timesheet.findOne({ _id: id });
		if(!Timesheet.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Timesheet.remove({ _id: id });
	}
});
