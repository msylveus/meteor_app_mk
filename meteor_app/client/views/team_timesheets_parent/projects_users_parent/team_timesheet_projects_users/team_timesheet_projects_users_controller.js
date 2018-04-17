this.TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersController = RouteController.extend({
	template: "TeamTimesheetsParent",
	

	yieldTemplates: {
		'TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsers': { to: 'TeamTimesheetsParentSubcontent'}
		
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
			Meteor.subscribe("project_users_list", this.params.projectId),
			Meteor.subscribe("team_timesheets_by_proj_users", this.params.projectId, this.params.userId)
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
			project_users_list: ProjectUsers.find({projectId:this.params.projectId}, {}),
			team_timesheets_by_proj_users: Timesheet.find({$and:[{project_id:this.params.projectId},{userId:this.params.userId}]}, {sort:["date"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});