this.ProjectUsers = new Mongo.Collection("project_users");

this.ProjectUsers.userCanInsert = function(userId, doc) {
	return true;
};

this.ProjectUsers.userCanUpdate = function(userId, doc) {
	return true;
};

this.ProjectUsers.userCanRemove = function(userId, doc) {
	return true;
};
