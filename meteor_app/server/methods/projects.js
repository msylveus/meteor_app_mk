Meteor.methods({
	"projectsInsert": function(data) {
		if(!Projects.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Projects.insert(data);
	},

	"projectsUpdate": function(id, data) {
		var doc = Projects.findOne({ _id: id });
		if(!Projects.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Projects.update({ _id: id }, { $set: data });
	},

	"projectsRemove": function(id) {
		var doc = Projects.findOne({ _id: id });
		if(!Projects.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Projects.remove({ _id: id });
	}
});
