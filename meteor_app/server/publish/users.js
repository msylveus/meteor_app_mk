Meteor.publish("users_null", function() {
	return Users.find({_id:null}, {});
});

Meteor.publish("user_list", function() {
	return Users.find({}, {});
});

