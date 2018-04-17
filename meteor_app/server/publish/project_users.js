Meteor.publish("project_users_list", function(projectId) {
	return ProjectUsers.publishJoinedCursors(ProjectUsers.find({projectId:projectId}, {}));
});

Meteor.publish("team_employees", function(projectId) {
	return ProjectUsers.publishJoinedCursors(ProjectUsers.find({projectId:projectId}, {sort:["date"]}));
});

Meteor.publish("projects_users_by_supervior", function() {
	return ProjectUsers.publishJoinedCursors(ProjectUsers.find({}, {}));
});

Meteor.publish("project_users_list_find_one", function(projectId) {
	return ProjectUsers.publishJoinedCursors(ProjectUsers.find({projectId:projectId}, {}));
});

