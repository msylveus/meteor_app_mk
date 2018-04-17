Meteor.methods({
	"teamInsert": function(data) {
		if(!Team.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Team.insert(data);
	},

	"teamUpdate": function(id, data) {
		var doc = Team.findOne({ _id: id });
		if(!Team.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Team.update({ _id: id }, { $set: data });
	},

	"teamRemove": function(id) {
		var doc = Team.findOne({ _id: id });
		if(!Team.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Team.remove({ _id: id });
	}
});
