this.ReportsController = RouteController.extend({
	template: "Reports",
	

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
			Meteor.subscribe("teaming"),
			Meteor.subscribe("projects_users_by_supervior")
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
			teaming: Projects.find({$or:[{supervisor:Meteor.userId()},{createdBy:Meteor.userId()}]}, {}),
			projects_users_by_supervior: ProjectUsers.find({}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});