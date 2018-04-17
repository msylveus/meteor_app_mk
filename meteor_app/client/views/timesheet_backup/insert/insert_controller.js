this.TimesheetBackupInsertController = RouteController.extend({
	template: "TimesheetBackupInsert",
	

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
			Meteor.subscribe("timesheet_backup_null")
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
			timesheet_backup_null: Timesheet.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});