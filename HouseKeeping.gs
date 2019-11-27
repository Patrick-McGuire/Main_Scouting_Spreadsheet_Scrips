///////////// Basic house keeping stuff /////////////
// Sheet names
var red1 = 'Red 1';
var red2 = 'Red 2';
var red3 = 'Red 3';
var blue1 = 'Blue 1';
var blue2 = 'Blue 2';
var blue3 = 'Blue 3';
var bigBrother = 'Big Brother';
var matchSchedule = 'Match Schedule';
var teamsMatches = 'Team Matches';
var dataByTeam = 'Data By Team';
// Commands
var enterDataCommand = '/enterdata'

// Create the menue when ever the spreadsheet is opened
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('TBA Import')
  .addItem('Match Times', 'getTimes')
  .addItem('Import Teams', 'ImportTeams')
  .addItem('Import Teams Matches', 'ImportTeamsMatches')
  .addItem('Import Match Schedule', 'ImportSchedule')
  .addItem('Test', 'test')
  .addToUi();
}

// Clears the match schedule, teams list, and team's matches data
function ClearData() {
  if(getValue(bigBrother, 'B21') == 1) {
    ClearMatchSchedule()
    ClearTeams()
    ClearTeamsMatches()
    
    setValue(bigBrother, 'D21', 'Disabled');
  } 
}

// Clears the match schedule, teams list, and team's matches data
function ClearMatchSchedule() {
  clearContent(matchSchedule, 'B2', 'I152');
}
// Clears the teams list
function ClearTeams() {
  clearContent(teamsMatches, 'C4', 'C103');
}
// Clears the team's matches data
function ClearTeamsMatches() {
  clearContent(teamsMatches, 'D4', 'R103');
}
// Clears the team's matches data
function ClearMatchTimes() {
  clearContent(matchSchedule, 'AJ4', 'AL152');
}

////// General functions for ease of use //////

// Clears content of a range
function clearContent(sheet, startCell, endCell) {
  SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startCell, endCell)).clearContent();
}

// Returns the values of a range of cells in the form of a array
function getValues(sheet, startCell, endCell) {
  return SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startCell, endCell)).getValues();
}
// Returns the value of a single cell
function getValue(sheet, startCell) {
  return SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startCell, "")).getValue();
}

// Sets the value of a group of cells
function setValues(sheet, startCell, endCell, values) {
  SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startCell, endCell)).setValues(values);
}
// Sets the value of a single cells
function setValue(sheet, startCell, value) {
  SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startCell, "")).setValue(value);
}

// Returns the string of a range
function getRangeString(sheet, startCell, endCell) {
  if(endCell == "" || endCell == 0) {
    return "" + "'" + sheet + "'"  + "!" + startCell;
  }
  return "" + "'" + sheet + "'"  + "!" + startCell + ':' + endCell;
}
  
  