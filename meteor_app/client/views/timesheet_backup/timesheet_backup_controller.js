this.TimesheetBackupController = RouteController.extend({
	template: "TimesheetBackup",
	

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
			Meteor.subscribe("timesheet_backups_list", this.params.selectedDate)
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
			timesheet_backups_list: Timesheet.find({$and:[{firstDayOfWeek:{$lte:this.params.selectedDate}},{lastDayOfWeek:{$gte:this.params.selectedDate}},{userId:Meteor.userId()}]}, {sort:[["date","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});