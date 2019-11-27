// Runs when ever anyone posts to this sheets web app link
function doPost(e) {
  var command = e.parameter.command;
  if(command == enterDataCommand) {
    enterAllData();
  } else if(command == importTeamsCommand) {
    ImportTeams();
  } else if(command == importTeamsMatchesCommand) {
    ImportTeamsMatches();
  } else if(command == importmatchScheduleCommand) {
    ImportSchedule();
  } else if(command == importmatchTimesCommand) {
    getTimes();
  } 
}