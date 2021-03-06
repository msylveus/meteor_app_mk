this.TeamTimesheetsParentProjectsParentController = RouteController.extend({
	template: "TeamTimesheetsParent",
	

	yieldTemplates: {
		'TeamTimesheetsParentProjectsParent': { to: 'TeamTimesheetsParentSubcontent'}
		
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
			params: this.params || {}
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});