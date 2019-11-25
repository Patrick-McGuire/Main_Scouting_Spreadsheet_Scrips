///////////// Basic house keeping stuff /////////////
// Sheet names
var red1 = 'Red 1';
var red2 = 'Red 1';
var red3 = 'Red 1';
var blue1 = 'Blue 1';
var blue2 = 'Blue 2';
var blue3 = 'Blue 3';
var bigBrother = 'Big Brother';
var matchSchedule = 'Match Schedule';
var teamsMatches = 'Team Matches';

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
  //if(SpreadsheetApp.getActiveSheet().getRange('Big Brother!B21').getValue() == 1){
  if(getValue(bigBrother, 'B', '21') == 1) {
    ClearMatchSchedule()
    ClearTeams()
    ClearTeamsMatches()
    
    //SpreadsheetApp.getActiveSheet().getRange('Big Brother!D21').setValue('Disabled');
    setValue(bigBrother, 'D', 21, 'Disabled');
  } 
}

// Clears the match schedule, teams list, and team's matches data
function ClearMatchSchedule() {
  clearContent(matchSchedule, 'B', 2, 'I', 152);
}
// Clears the teams list
function ClearTeams() {
  clearContent(teamsMatches, 'C', 4, 'C', 103);
}
// Clears the team's matches data
function ClearTeamsMatches() {
  clearContent(teamsMatches, 'D', 4, 'R', 103);
}
// Clears the team's matches data
function ClearMatchTimes() {
  clearContent(matchSchedule, 'AJ', 4, 'AL', 152);
}

////// General functions for ease of use //////

// Clears content of a range
function clearContent(sheet, startColumn, startRow, endColumn, endRow) {
  SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startColumn, startRow, endColumn, endRow)).clearContent();
}

// Returns the values of a range of cells in the form of a array
function getValues(sheet, startColumn, startRow, endColumn, endRow) {
  return SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startColumn, startRow, endColumn, endRow)).getValues();
}
// Returns the value of a single cell
function getValue(sheet, startColumn, startRow) {
  return SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startColumn, startRow, "", 0)).getValue();
}

// Sets the value of a group of cells
function setValues(sheet, startColumn, startRow, endColumn, endRow, values) {
  SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startColumn, startRow, endColumn, endRow)).setValues(values);
}
// Sets the value of a single cells
function setValue(sheet, startColumn, startRow, value) {
  SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startColumn, startRow, "", 0)).setValue(value);
}

// Returns the string of a range
function getRangeString(sheet, startColumn, startRow, endColumn, endRow) {
  if(endColumn == '' || endRow == 0) {
    return "" + "'" + sheet + "'"  + "!" + startColumn + startRow;
  }
  return "" + "'" + sheet + "'"  + "!" + startColumn + startRow + ':' + endColumn + endRow;
}



function test() {
  setValue(red1, "A", 1, "Bruh");
  setValues(red1, 'B', 1, 'C', 1, [["Duh", "Meh"]]);
  SpreadsheetApp.getActive().getActiveSheet().getRange('Red 1!A1').setValue();
}
  
  