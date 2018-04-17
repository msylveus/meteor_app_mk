// Projects
Projects.join(Users, "supervisor", "user", []);

// ProjectUsers
ProjectUsers.join(Users, "userId", "user", []);
ProjectUsers.join(Projects, "projectId", "project", []);

// Team
Team.join(Projects, "project", "project", []);

// Timesheet
Timesheet.join(Projects, "project_id", "project", []);
Timesheet.join(Users, "userId", "user", []);

