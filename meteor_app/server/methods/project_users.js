Meteor.methods({
	"projectUsersInsert": function(data) {
		if(!ProjectUsers.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return ProjectUsers.insert(data);
	},

	"projectUsersUpdate": function(id, data) {
		var doc = ProjectUsers.findOne({ _id: id });
		if(!ProjectUsers.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		ProjectUsers.update({ _id: id }, { $set: data });
	},

	"projectUsersRemove": function(id) {
		var doc = ProjectUsers.findOne({ _id: id });
		if(!ProjectUsers.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		ProjectUsers.remove({ _id: id });
	}
});
