Meteor.publish("project_list", function() {
	return Projects.publishJoinedCursors(Projects.find({}, {}));
});

Meteor.publish("projects_null", function() {
	return Projects.publishJoinedCursors(Projects.find({_id:null}, {}));
});

Meteor.publish("project", function(projectId) {
	return Projects.publishJoinedCursors(Projects.find({_id:projectId}, {}));
});

Meteor.publish("supervisor_projects", function() {
	return Projects.publishJoinedCursors(Projects.find({supervisor:this.userId}, {}));
});

Meteor.publish("teaming", function() {
	return Projects.publishJoinedCursors(Projects.find({$or:[{supervisor:this.userId},{createdBy:this.userId}]}, {}));
});

Meteor.publish("my_projects", function() {
	return Projects.publishJoinedCursors(Projects.find({$or:[{users:this.userId},{supervisor:this.userId},{createdBy:this.userId}]}, {}));
});

