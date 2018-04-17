this.TimesheetBackupUpdateController = RouteController.extend({
	template: "TimesheetBackupUpdate",
	

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
			Meteor.subscribe("my_projects"),
			Meteor.subscribe("timesheet_backups", this.params.timesheetBackupsId)
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
			my_projects: Projects.find({$or:[{users:Meteor.userId()},{supervisor:Meteor.userId()},{createdBy:Meteor.userId()}]}, {}),
			timesheet_backups: Timesheet.findOne({_id:this.params.timesheetBackupsId}, {sort:[["date","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});