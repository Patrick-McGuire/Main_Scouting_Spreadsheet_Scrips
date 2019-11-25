///////////// All functions for collecting data from the data input sheets /////////////

// Import all sheets that we need to import from
function masterEnter() {
  EnterData(red1);
  EnterData(red2);
  EnterData(red3);
  EnterData(blue1);
  EnterData(blue2);
  EnterData(blue3);  
}

// Takes the match data from a given sheet name and puts it into the data by team sheet
function EnterData(sheetName) {
  clearContent(sheetName, 'H25', 'I44');

  //Get data from the sheetName sheet
  var autoData = getValues(sheetName, 'D3', 'D22');
  var teleData = getValues(sheetName, 'F3', 'F22');
  
  //Get the team ID, and match ID
  var teamID = getValue(sheetName, 'I3');
  var matchID = getValue(sheetName, 'I4');
  
  
  //Calculate what cell to put the data in
  var autoTop = (teamID * 43 - 39)
  var autoBottom = (teamID * 43 - 20)
  var teleTop = (teamID * 43 - 19)
  var teleBottom = (teamID * 43)
  
  //Put the auto values back into the sheet
  setValues(sheetName, 'H25', 'H44', autoData)
  setValues(dataByTeam, "" + matchID + autoTop, "" + matchID + autoBottom, autoData) 
  
  
  //Put the tele values back into the sheet
  setValues(sheetName, 'I25', 'I44', autoData)
  setValues(dataByTeam, "" + matchID + teleTop, "" + matchID + teleBottom, teleData) 
  
  //Clear the "Value:" data
  clearContent(sheetName, 'D3', 'D22');
  clearContent(sheetName, 'F3', 'F22');
}