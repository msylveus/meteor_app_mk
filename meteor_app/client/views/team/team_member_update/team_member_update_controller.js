this.TeamTeamMemberUpdateController = RouteController.extend({
	template: "TeamTeamMemberUpdate",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("user_list"),
			Meteor.subscribe("project", this.params.projectId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			user_list: Users.find({}, {}),
			project: Projects.findOne({_id:this.params.projectId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});