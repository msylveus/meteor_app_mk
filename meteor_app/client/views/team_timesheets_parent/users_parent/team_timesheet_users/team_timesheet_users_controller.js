this.TeamTimesheetsParentUsersParentTeamTimesheetUsersController = RouteController.extend({
	template: "TeamTimesheetsParent",
	

	yieldTemplates: {
		'TeamTimesheetsParentUsersParentTeamTimesheetUsers': { to: 'TeamTimesheetsParentSubcontent'}
		
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
			Meteor.subscribe("projects_users_by_supervior"),
			Meteor.subscribe("team_timesheets_by_users", this.params.userId)
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
			projects_users_by_supervior: ProjectUsers.find({}, {}),
			team_timesheets_by_users: Timesheet.find({userId:this.params.userId}, {sort:["date"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});