///////////// All functions for collecting data from the data input sheets /////////////

// Functions for every sheet that we need to import from
function Sheet1() {
  EnterData('RED 1');
}

function Sheet2() {
  EnterData('RED 2');
}

function Sheet3() {
  EnterData('RED 3');
}

function Sheet4() {
  EnterData('BLUE 1');
}

function Sheet5() {
  EnterData('BLUE 2');
}

function Sheet6() {
  EnterData('BLUE 3');
}

// Import all sheets that we need to import from
function masterEnter() {

  Sheet1();

  Sheet2();

  Sheet3();

  Sheet4();

  Sheet5();

  Sheet6();
  
}

// Takes the match data from a given sheet name and puts it into the data by team sheet
function EnterData(sheetName) {
  

  //Clear the last match data
  SpreadsheetApp.getActive().getActiveSheet().getRange(sheetName + '!H25:I44').clearContent();

  //Get data from the sheetName sheet
  var autoData = SpreadsheetApp.getActiveSheet().getRange(sheetName + '!D3:D22').getValues();
  var teleData = SpreadsheetApp.getActiveSheet().getRange(sheetName + '!F3:F22').getValues();
  
  //Get the team ID, and match ID
  var teamID = SpreadsheetApp.getActiveSheet().getRange(sheetName + '!I3').getValue();
  var matchID = SpreadsheetApp.getActiveSheet().getRange(sheetName + '!I4').getValue();
  
  //Calculate what cell to put the data in
  var autoTop = (teamID * 43 - 39)
  var autoBottom = (teamID * 43 - 20)
  var teleTop = (teamID * 43 - 19)
  var teleBottom = (teamID * 43)
  var autoRange = "Data By Team!" + matchID + autoTop + ":" + matchID + autoBottom;
  var teleRange = "Data By Team!" + matchID + teleTop + ":" + matchID + teleBottom;
  
  //Put the auto values back into the sheet
  SpreadsheetApp.getActiveSheet().getRange(sheetName + '!H25:H44').setValues(autoData);
  SpreadsheetApp.getActiveSheet().getRange(autoRange).setValues(autoData);
  
  //Put the tele values back into the sheet
  SpreadsheetApp.getActiveSheet().getRange(sheetName + '!I25:I44').setValues(teleData);
  SpreadsheetApp.getActiveSheet().getRange(teleRange).setValues(teleData);
  
  //Clear the "Value:" data
  SpreadsheetApp.getActive().getActiveSheet().getRange(sheetName + '!D3:D22').setValues([[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],['']]);
  SpreadsheetApp.getActive().getActiveSheet().getRange(sheetName + '!F3:F22').setValues([[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],['']]);
}