Projects.allow({
	insert: function (userId, doc) {
		return false;
	},

	update: function (userId, doc, fields, modifier) {
		return false;
	},

	remove: function (userId, doc) {
		return false;
	}
});

Projects.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Projects.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
var projectId = this.args[0]._id;

ProjectUsers.remove({projectId: projectId});


});

Projects.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Projects.before.remove(function(userId, doc) {
	
});

Projects.after.insert(function(userId, doc) {
	
var array = this.args[0].users;

var projectId = this.args[0]._id;
var supervisorId = this.args[0].supervisor;
var projectTitle = this.args[0].title;

console.log("ProjectId:", projectId);

for (i = 0; i < array.length; i++) {
  console.log("printing inside for loop", array[i]);
  ProjectUsers.insert({userId: array[i], projectId: projectId, supervisorId: supervisorId, projectTitle: projectTitle});
  Team.insert({userId: array[i], projectId: projectId});
}


});

Projects.after.update(function(userId, doc, fieldNames, modifier, options) {
	
console.log("After Update------- ------users list",this.args[1].$set.users);


var array = this.args[1].$set.users;
var projectId = this.args[0]._id;

//after insert json object differs therefore getting second argument with key .$set 
var supervisorId = this.args[1].$set.supervisor;//getting supervisorid
var projectTitle = this.args[1].$set.title;//getting project title

console.log("ProjectId:", projectId);
for (i = 0; i < array.length; i++) {
  console.log("printing inside for loop", array[i]);
  ProjectUsers.insert({userId: array[i], projectId: projectId, supervisorId: supervisorId, projectTitle: projectTitle});
  Team.insert({userId: array[i], projectId: projectId});
}

});

Projects.after.remove(function(userId, doc) {
	
//After deleting project we need to delete all entries from project_users with this projectid
console.log("****After Remove*****", this.args[0]);
var projectId = this.args[0]._id;
ProjectUsers.remove({projectId: projectId});
});
