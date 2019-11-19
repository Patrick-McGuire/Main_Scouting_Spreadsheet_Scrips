///////////// Basic house keeping functions /////////////

// Create the menue when ever the spreadsheet is opened
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('TBA Import')
      .addItem('Match Times', 'getTimes')
      .addItem('Import Teams', 'ImportTeams')
      .addItem('Import Teams Matches', 'ImportTeamsMatches')
      .addItem('Import Match Schedule', 'ImportSchedule')
      .addToUi();
}

// Clears the match schedule, teams list, and team's matches data
function ClearData() {
  if(SpreadsheetApp.getActiveSheet().getRange('Big Brother!B21').getValue() == 1){
    
    ClearMatchSchedule()
    ClearTeams()
    ClearTeamsMatches()
    
    SpreadsheetApp.getActiveSheet().getRange('Big Brother!D21').setValue('Disabled');
  } 
}

// Clears the match schedule, teams list, and team's matches data
function ClearMatchSchedule() {
  SpreadsheetApp.getActive().getActiveSheet().getRange('Match Schedule!B2:I152').clearContent();
}
// Clears the teams list
function ClearTeams() {
  SpreadsheetApp.getActive().getActiveSheet().getRange('Team Matches!C4:C103').clearContent();
}
// Clears the team's matches data
function ClearTeamsMatches() {
  SpreadsheetApp.getActive().getActiveSheet().getRange('Team Matches!D4:R103').clearContent();
}