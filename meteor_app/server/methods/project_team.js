Meteor.methods({
	"projectTeamInsert": function(data) {
		if(!ProjectTeam.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return ProjectTeam.insert(data);
	},

	"projectTeamUpdate": function(id, data) {
		var doc = ProjectTeam.findOne({ _id: id });
		if(!ProjectTeam.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		ProjectTeam.update({ _id: id }, { $set: data });
	},

	"projectTeamRemove": function(id) {
		var doc = ProjectTeam.findOne({ _id: id });
		if(!ProjectTeam.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		ProjectTeam.remove({ _id: id });
	}
});
