this.ProjectsUpdateController = RouteController.extend({
	template: "ProjectsUpdate",
	

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
			Meteor.subscribe("admin_users"),
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
			admin_users: Users.find({}, {}),
			project: Projects.findOne({_id:this.params.projectId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});