///////////// All functions for collecting data from the data input sheets /////////////

// Import all sheets that we need to import from
function enterAllData() {
  // Get all of the team IDs and match IDs from the compiled list in the big brother sheet
  var teamMatchIDs = getValues(enterAssist, 'C3', 'D8');
  var allMatchData = getValues(enterAssist, 'G3', 'R22')
  
  // Put the data back in for prev match data
  setValues(enterAssist, "G25", "R44", allMatchData)
  
  // List of every sheet we need to import from
  var sheetsToEnter = [red1, red2, red3, blue1, blue2, blue3];
  
  for(var i = 0; i < sheetsToEnter.length; i++) {
    // Get the sheet that we are importing from
    var activeSheet = sheetsToEnter[i];
    
    var matchData = [];
    for(var j = 0; j < allMatchData.length; j++) {
      matchData[j] = [allMatchData[j][i * 2]]
      matchData[j + allMatchData.length] = [allMatchData[j][(i * 2) + 1]]
    }
    
    // Figure out if there is any data in matchdata besides empty strings
    var dataInSet = false;
    for(var x = 0; x < matchData.length; x++) {
      if(matchData[x][0] != "") {
        dataInSet = true;
        break;
      }
    }
    
    // If there is data, fill any empty strings with 0
    if(dataInSet) {
      for(var x = 0; x < matchData.length; x++) {
        if(matchData[x][0] == '') {
          matchData[x][0] = 0;
        }
      }
    }

    // Get the team ID, and match ID from the existing array
    var teamID = teamMatchIDs[i][0];
    var matchID = teamMatchIDs[i][1];
    
    // Calculate what cell to put the data in
    var topRow = (teamID * 43 - 39);
    var bottomRow = (teamID * 43);
    
    // Put the data back into the sheet
    setValues(dataByTeam, "" + matchID + topRow, "" + matchID + bottomRow, matchData) 
    
    //Clear the "Value:" data. This horrible array takes less time to set than two clear value funtions, sooo.... we use it (~4s-6s less time total)
    var clearedValues = [["", "='Big Brother'!O4", ""], ["", "='Big Brother'!O5", ""], ["", "='Big Brother'!O6", ""], ["", "='Big Brother'!O7", ""], ["", "='Big Brother'!O8", ""], ["", "='Big Brother'!O9", ""], ["", "='Big Brother'!O10", ""], ["", "='Big Brother'!O11", ""], ["", "='Big Brother'!O12", ""], ["", "='Big Brother'!O13", ""], ["", "='Big Brother'!O14", ""], ["", "='Big Brother'!O15", ""], ["", "='Big Brother'!O16", ""], ["", "='Big Brother'!O17", ""], ["", "='Big Brother'!O18", ""], ["", "='Big Brother'!O19", ""], ["", "='Big Brother'!O20", ""], ["", "='Big Brother'!O21", ""], ["", "='Big Brother'!O22", ""], ["", "='Big Brother'!O23", ""]]
    setValues(activeSheet, 'D3', 'F22', clearedValues);
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