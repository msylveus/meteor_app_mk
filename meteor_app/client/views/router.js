Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"projects",
	"projects.details",
	"projects.insert",
	"projects.update",
	"emploee_list",
	"team",
	"team.team_users",
	"team.team_member_update",
	"timesheet",
	"timesheet_backup",
	"timesheet_backup.details",
	"timesheet_backup.insert",
	"timesheet_backup.update",
	"timesheet_parent",
	"team_timesheets_parent",
	"team_timesheets_parent.projects_parent",
	"team_timesheets_parent.projects_parent.team_timesheet_project",
	"team_timesheets_parent.users_parent",
	"team_timesheets_parent.users_parent.team_timesheet_users",
	"team_timesheets_parent.projects_users_parent",
	"team_timesheets_parent.projects_users_parent.team_timesheet_projects_users",
	"reports",
	"reports.report_by_project",
	"reports.report_by_project_and_user"
];

Router.freeRoutes = [
	"home_public"
];

Router.roleMap = [
	{ route: "admin",	roles: ["admin","supervisor","employee"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "user_settings",	roles: ["admin"] },
	{ route: "user_settings.profile",	roles: ["admin"] },
	{ route: "user_settings.change_pass",	roles: ["admin"] },
	{ route: "projects",	roles: ["admin"] },
	{ route: "projects.details",	roles: ["admin"] },
	{ route: "projects.insert",	roles: ["admin"] },
	{ route: "projects.update",	roles: ["admin"] },
	{ route: "team",	roles: ["supervisor","admin"] },
	{ route: "team.team_users",	roles: ["supervisor","admin"] },
	{ route: "team.team_member_update",	roles: ["supervisor","admin"] },
	{ route: "team_timesheets_parent",	roles: ["admin","supervisor"] },
	{ route: "team_timesheets_parent.projects_parent",	roles: ["admin","supervisor"] },
	{ route: "team_timesheets_parent.projects_parent.team_timesheet_project",	roles: ["admin","supervisor"] },
	{ route: "team_timesheets_parent.users_parent",	roles: ["admin","supervisor"] },
	{ route: "team_timesheets_parent.users_parent.team_timesheet_users",	roles: ["admin","supervisor"] },
	{ route: "team_timesheets_parent.projects_users_parent",	roles: ["admin","supervisor"] },
	{ route: "team_timesheets_parent.projects_users_parent.team_timesheet_projects_users",	roles: ["admin","supervisor"] }
];

Router.defaultFreeRoute = "home_public";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/verify_email/:verifyEmailToken", {name: "verify_email", title: "", controller: "VerifyEmailController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", title: "Welcome {{userFullName}}!", controller: "HomePrivateController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", title: "", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
	this.route("/projects", {name: "projects", title: "", controller: "ProjectsController"});
	this.route("/projects/details/:projectId", {name: "projects.details", title: "", controller: "ProjectsDetailsController"});
	this.route("/projects/insert", {name: "projects.insert", title: "", controller: "ProjectsInsertController"});
	this.route("/projects/update/:projectId", {name: "projects.update", title: "", controller: "ProjectsUpdateController"});
	this.route("/emploee_list/:projectId", {name: "emploee_list", title: "", controller: "EmploeeListController"});
	this.route("/team", {name: "team", title: "Team", controller: "TeamController"});
	this.route("/team/team_users/:projectId", {name: "team.team_users", title: "Team", controller: "TeamTeamUsersController"});
	this.route("/team/team_member_update/:projectId", {name: "team.team_member_update", title: "Team", controller: "TeamTeamMemberUpdateController"});
	this.route("/timesheet", {name: "timesheet", title: "", controller: "TimesheetController"});
	this.route("/timesheet_backup/:selectedDate", {name: "timesheet_backup", title: "My Timesheet", controller: "TimesheetBackupController"});
	this.route("/timesheet_backup/:selectedDate/details/:timesheetBackupsId", {name: "timesheet_backup.details", title: "My Timesheet", controller: "TimesheetBackupDetailsController"});
	this.route("/timesheet_backup/:selectedDate/insert", {name: "timesheet_backup.insert", title: "My Timesheet", controller: "TimesheetBackupInsertController"});
	this.route("/timesheet_backup/:selectedDate/update/:timesheetBackupsId", {name: "timesheet_backup.update", title: "My Timesheet", controller: "TimesheetBackupUpdateController"});
	this.route("/timesheet_parent", {name: "timesheet_parent", title: "", controller: "TimesheetParentController"});
	this.route("/team_timesheets_parent", {name: "team_timesheets_parent", title: "", controller: "TeamTimesheetsParentController"});
	this.route("/team_timesheets_parent/projects_parent", {name: "team_timesheets_parent.projects_parent", title: "", controller: "TeamTimesheetsParentProjectsParentController"});
	this.route("/team_timesheets_parent/projects_parent/team_timesheet_project/:projectId", {name: "team_timesheets_parent.projects_parent.team_timesheet_project", title: "My Team's Timesheet", controller: "TeamTimesheetsParentProjectsParentTeamTimesheetProjectController"});
	this.route("/team_timesheets_parent/users_parent", {name: "team_timesheets_parent.users_parent", title: "", controller: "TeamTimesheetsParentUsersParentController"});
	this.route("/team_timesheets_parent/users_parent/team_timesheet_users/:userId", {name: "team_timesheets_parent.users_parent.team_timesheet_users", title: "My Team's Timesheet", controller: "TeamTimesheetsParentUsersParentTeamTimesheetUsersController"});
	this.route("/team_timesheets_parent/projects_users_parent", {name: "team_timesheets_parent.projects_users_parent", title: "", controller: "TeamTimesheetsParentProjectsUsersParentController"});
	this.route("/team_timesheets_parent/projects_users_parent/team_timesheet_projects_users/:projectId/:userId", {name: "team_timesheets_parent.projects_users_parent.team_timesheet_projects_users", title: "My Team's Timesheet", controller: "TeamTimesheetsParentProjectsUsersParentTeamTimesheetProjectsUsersController"});
	this.route("/reports", {name: "reports", title: "", controller: "ReportsController"});
	this.route("/reports/report_by_project", {name: "reports.report_by_project", title: "", controller: "ReportsReportByProjectController"});
	this.route("/reports/report_by_project_and_user", {name: "reports.report_by_project_and_user", title: "", controller: "ReportsReportByProjectAndUserController"});
});
