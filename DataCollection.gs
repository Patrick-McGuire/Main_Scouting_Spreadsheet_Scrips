///////////// All functions for collecting data from the data input sheets /////////////

// 
function enterAllData() {
  // Get all of the team IDs and match IDs from the compiled list in the big brother sheet
  var teamMatchIDs = getValues(bigBrother, 'C26', 'D31');
  
  // List of every sheet we need to import from
  var sheetsToEnter = [red1, red2, red3, blue1, blue2, blue3];
  
  for(var i = 0; i < sheetsToEnter.length; i++) {
    // Get the sheet that we are importing from
    var activeSheet = sheetsToEnter[i];
    
    // Get the data from the sheet
    var rawMatchData = getValues(activeSheet, 'D3', 'F22');
    var matchData = [];
    var matchData2c = [];
    for(var x = 0; x < rawMatchData.length; x++) {
      matchData[x] = [rawMatchData[x][0]];
      matchData[x + rawMatchData.length] = [rawMatchData[x][2]];
      
      matchData2c[x] = [rawMatchData[x][0], rawMatchData[x][2]];
    }
    // Get the team ID, and match ID from the existing array
    var teamID = teamMatchIDs[i][0];
    var matchID = teamMatchIDs[i][1];
    
    // Calculate what cell to put the data in
    var topRow = (teamID * 43 - 39);
    var bottomRow = (teamID * 43);
    
    // Put the data back into the sheet
    setValues(activeSheet, 'H25', 'I44', matchData2c)
    setValues(dataByTeam, "" + matchID + topRow, "" + matchID + bottomRow, matchData) 
    
    //Clear the "Value:" data
    clearContent(activeSheet, 'D3', 'D22');
    clearContent(activeSheet, 'F3', 'F22');
  }
}

// Single sheet OLD:
// Takes the match data from a given sheet name and puts it into the data by team sheet
function EnterData(sheetName) {

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