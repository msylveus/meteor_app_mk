this.TeamTeamUsersController = RouteController.extend({
	template: "TeamTeamUsers",
	

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
			Meteor.subscribe("team_employees", this.params.projectId)
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
			team_employees: ProjectUsers.find({projectId:this.params.projectId}, {sort:["date"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});