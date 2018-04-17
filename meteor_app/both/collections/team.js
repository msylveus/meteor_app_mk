this.Team = new Mongo.Collection("team");

this.Team.userCanInsert = function(userId, doc) {
	return true;
};

this.Team.userCanUpdate = function(userId, doc) {
	return true;
};

this.Team.userCanRemove = function(userId, doc) {
	return true;
};
