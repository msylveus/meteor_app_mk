this.TeamTimesheetsParentProjectsParentTeamTimesheetProjectController = RouteController.extend({
	template: "TeamTimesheetsParent",
	

	yieldTemplates: {
		'TeamTimesheetsParentProjectsParentTeamTimesheetProject': { to: 'TeamTimesheetsParentSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("TeamTimesheetsParent"); this.render("loading", { to: "TeamTimesheetsParentSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("teaming"),
			Meteor.subscribe("team_timesheets_by_proj", this.params.projectId)
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
			team_timesheets_by_proj: Timesheet.find({project_id:this.params.projectId}, {sort:["date"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});