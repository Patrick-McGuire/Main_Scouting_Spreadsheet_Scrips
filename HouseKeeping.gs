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
var enterAssist = 'Enter Assist';
var robotPics = 'Robot Pics';
var theme = "Theme"
picklist = "Picklist"
// Commands
var enterDataCommand = '/enterdata';
var importTeamsCommand = '/importteams';
var importTeamsMatchesCommand = '/importteamsmatches';
var importmatchScheduleCommand = '/importschedule';
var importmatchTimesCommand = '/importmatchtimes';
var testCommand = '/test1254';
// Colors
blueColor = '#0000ff'
redColor = '#ff0000'

// Create the menue when ever the spreadsheet is opened
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('TBA Import')
  .addItem('Match Times', 'getTimes')
  .addItem('Import Teams', 'ImportTeams')
  .addItem('Import Teams Matches', 'ImportTeamsMatches')
  .addItem('Import Match Schedule', 'ImportSchedule')
  .addItem('Get Pics', 'getPics')
  .addItem('Update Theme', 'reformatSheet')
  .addItem('Test', 'getInnerOuterData') //'testNOTHINGATACHEDHERE')
  .addToUi();
}

// Clears the match schedule, teams list, and team's matches data
function ClearData(spreadsheet) {
  if(getValue(spreadsheet, bigBrother, 'B21') == 1) {
    ClearMatchSchedule(spreadsheet)
    ClearTeams(spreadsheet)
    ClearTeamsMatches(spreadsheet)
    
    setValue(spreadsheet, bigBrother, 'D21', 'Disabled');
  } 
}

// Clears the match schedule, teams list, and team's matches data
function ClearMatchSchedule(spreadsheet) {
  clearContent(spreadsheet, matchSchedule, 'B2', 'I152');
}
// Clears the teams list
function ClearTeams(spreadsheet) {
  clearContent(spreadsheet, teamsMatches, 'C4', 'C103');
}
// Clears the team's matches data
function ClearTeamsMatches(spreadsheet) {
  clearContent(spreadsheet, teamsMatches, 'D4', 'R103');
}
// Clears the team's matches data
function ClearMatchTimes(spreadsheet) {
  clearContent(spreadsheet, matchSchedule, 'AJ4', 'AL152');
}

////// General functions for ease of use //////

// Clears content of a range
function clearContent(spreadsheet, sheet, startCell, endCell) {
  spreadsheet.getRange(getRangeString(sheet, startCell, endCell)).clearContent();
}

// Returns the values of a range of cells in the form of a array
function getValues(spreadsheet, sheet, startCell, endCell) {
  return spreadsheet.getRange(getRangeString(sheet, startCell, endCell)).getValues();
}
// Returns the value of a single cell
function getValue(spreadsheet, sheet, startCell) {
  return spreadsheet.getRange(getRangeString(sheet, startCell, "")).getValue();
}

// Sets the value of a group of cells
function setValues(spreadsheet, sheet, startCell, endCell, values) {
  spreadsheet.getRange(getRangeString(sheet, startCell, endCell)).setValues(values);
}
// Sets the value of a single cells
function setValue(spreadsheet, sheet, startCell, value) {
  spreadsheet.getRange(getRangeString(sheet, startCell, "")).setValue(value);
}

// Returns the string of a range
function getRangeString(sheet, startCell, endCell) {
  if(endCell == "" || endCell == 0) {
    return "" + "'" + sheet + "'"  + "!" + startCell;
  }
  return "" + "'" + sheet + "'"  + "!" + startCell + ':' + endCell;
}
