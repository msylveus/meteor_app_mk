this.ProjectTeam = new Mongo.Collection("project_team");

this.ProjectTeam.userCanInsert = function(userId, doc) {
	return true;
};

this.ProjectTeam.userCanUpdate = function(userId, doc) {
	return true;
};

this.ProjectTeam.userCanRemove = function(userId, doc) {
	return true;
};
