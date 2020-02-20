///////////// All functions that import data from TBA /////////////
//https://www.thebluealliance.com/api/v3/event/2020week0/matches?X-TBA-Auth-Key=ElyWdtB6HR7EiwdDXFmX2PDXQans0OMq83cdBcOhwri2TTXdMeYflYARvlbDxYe6
function getInnerOuterData() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  clearContent(spreadsheet, 'Inner', 'A2', 'F');
  
  var eventKey = getEventKey(spreadsheet);
  
  var tbaImportJSON = importTBA("/event/"+eventKey+"/matches");
  
  var match_numbers = [];
  var match_types = [];
  
  var redInnerAuto = [];
  var redOuterAuto = [];
  var redInnerTele = [];
  var redOuterTele = [];
  
  var blueInnerAuto = [];
  var blueOuterAuto = [];
  var blueInnerTele = [];
  var blueOuterTele = [];
  
  for(var j = 0; j < tbaImportJSON.length ; j++){
    match_numbers.push([tbaImportJSON[j].match_number]);
    match_types.push([tbaImportJSON[j].comp_level]);
    
    redInnerAuto.push([tbaImportJSON[j].score_breakdown.red.autoCellsInner])
    redOuterAuto.push([tbaImportJSON[j].score_breakdown.red.autoCellsOuter])
    redInnerTele.push([tbaImportJSON[j].score_breakdown.red.teleopCellsInner])
    redOuterTele.push([tbaImportJSON[j].score_breakdown.red.teleopCellsOuter])
    
    blueInnerAuto.push([tbaImportJSON[j].score_breakdown.blue.autoCellsInner])
    blueOuterAuto.push([tbaImportJSON[j].score_breakdown.blue.autoCellsOuter])
    blueInnerTele.push([tbaImportJSON[j].score_breakdown.blue.teleopCellsInner])
    blueOuterTele.push([tbaImportJSON[j].score_breakdown.blue.teleopCellsOuter])
  }
  
  var values = [];
  for(var i = 0; i < redInnerAuto.length; i++) {
    values.push([Number(redInnerAuto[i]) + Number(redInnerTele[i]), Number(redOuterAuto[i]) + Number(redOuterTele[i]), Number(blueInnerAuto[i]) + Number(blueInnerTele[i]), Number(blueOuterAuto[i]) + Number(blueOuterTele[i])]);
  }
  
  var endRow = match_numbers.length + 1;
  setValues(spreadsheet, 'Inner', 'A2', 'A'+ endRow, match_numbers)
  setValues(spreadsheet, 'Inner', 'B2', 'B'+ endRow, match_types)
  setValues(spreadsheet, 'Inner', 'C2', 'F'+ endRow, values)
}

// Gets the start times of every match from the event specified in 'Big Brother', and puts them into the spreadsheet, so they can be made into twitch links
function getTimes() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  // Clear old Times
  setStatus(spreadsheet, 'Clearing old Times');
  ClearMatchTimes(spreadsheet);
  
  /// Pull from TBA ///
  setStatus(spreadsheet, 'Importing Match Times');
  
  // Get the event key from the spreadsheet
  var eventKey = getEventKey(spreadsheet);
  
  // Import the data from TBA
  var tbaImportJSON = importTBA("/event/"+eventKey+"/matches");
  
  var match_numbers = [];
  var match_types = [];
  var match_time = [];
  
  // Extract the data we need from the JSON file
  for(var j = 0; j < tbaImportJSON.length ; j++){
    match_numbers.push([tbaImportJSON[j].match_number]);
    match_types.push([tbaImportJSON[j].comp_level]);
    match_time.push([tbaImportJSON[j].actual_time]);
  }
  
  //Put the times into the sheet
  var endRow = match_numbers.length + 3;
  setValues(spreadsheet, matchSchedule, 'AL4', 'AL'+ endRow, match_numbers)
  setValues(spreadsheet, matchSchedule, 'AK4', 'AK'+ endRow, match_types)
  setValues(spreadsheet, matchSchedule, 'AJ4', 'AJ'+ endRow, match_time)
  
  setStatus(spreadsheet, 'Done')
}

// Imports the math schedule for the event specified in 'Big Brother' from TBA, and puts it into the sheet
function ImportSchedule() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  // If the function is 'enabled' in the big brother sheet, then run the code
  if(getValue(spreadsheet, bigBrother, 'B18') == 1) {
    //Clear old match data
    setStatus(spreadsheet, 'Clearing match schedule')
    ClearMatchSchedule(spreadsheet);
  
    // Get the event key from the spreadsheet
    var eventKey = getEventKey(spreadsheet);
  
    //Import schedule
    var tbaImportJSON = importTBA("/event/" + eventKey + "/matches");
  
    var redOne = [];
    var redTwo = [];
    var redThree = [];
  
    var blueOne = [];
    var blueTwo = [];
    var blueThree = [];
  
    var matchNumber = [];
    var matchType = [];
    
    for(var j = 0; j < tbaImportJSON.length; j++){
      redOne.push([tbaImportJSON[j].alliances.red.team_keys]);
      redTwo.push([tbaImportJSON[j].alliances.red.team_keys.slice(1, 2)]);
      redThree.push([tbaImportJSON[j].alliances.red.team_keys.slice(2, 3)]);
  
      blueOne.push([tbaImportJSON[j].alliances.blue.team_keys]);
      blueTwo.push([tbaImportJSON[j].alliances.blue.team_keys.slice(1, 2)]);
      blueThree.push([tbaImportJSON[j].alliances.blue.team_keys.slice(2, 3)]);
      
      matchNumber.push([tbaImportJSON[j].match_number]);
      matchType.push([tbaImportJSON[j].comp_level]);
      
    }
    
    //Put the match schedule into the sheet
    var endRow = redOne.length + 1;
    
    setValues(spreadsheet, matchSchedule, 'D2', 'D' + endRow, redOne);
    setValues(spreadsheet, matchSchedule, 'E2', 'E' + endRow, redTwo);
    setValues(spreadsheet, matchSchedule, 'F2', 'F' + endRow, redThree);

    setValues(spreadsheet, matchSchedule, 'G2', 'G' + endRow, blueOne);
    setValues(spreadsheet, matchSchedule, 'H2', 'H' + endRow, blueTwo);
    setValues(spreadsheet, matchSchedule, 'I2', 'I' + endRow, blueThree);

    setValues(spreadsheet, matchSchedule, 'C2', 'C' + endRow, matchNumber);
    setValues(spreadsheet, matchSchedule, 'B2', 'B' + endRow, matchType);    
    
    //Disable Function
    setValue(spreadsheet, bigBrother, 'D18', 'Disabled')
    setStatus(spreadsheet, 'Done')
  }
}

// Imports a list of teams for the event specified in 'Big Brother'from TBA, and puts it into the sheet
function ImportTeams() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  // If the function is 'enabled' in the big brother sheet, then run the code
  if(getValue(spreadsheet, bigBrother, 'B12') == 1){
    
    var listOfTeams = [];
  
    //Clear old data
    setStatus(spreadsheet, 'Clearing list of teams')
    ClearTeams(spreadsheet)
  
    //Get event key from TBA Import sheet
    var eventKey = getEventKey(spreadsheet);
  
    //Import teams
    setStatus(spreadsheet, 'Importing teams from TBA')
    
    var tbaImportJSON = importTBA("/event/"+eventKey+"/teams");  
  
    for(var j = 0; j < tbaImportJSON.length ; j++){
      listOfTeams.push([tbaImportJSON[j].team_number]); 
    }
    
    //Sort data
    listOfTeams.sort(function(a, b){return a - b});
  
    //Put the team numbers into the sheet
    var endRow = listOfTeams.length + 3;
    setValues(spreadsheet, teamsMatches, 'C4', 'C' + endRow, listOfTeams);
    
    //Disable Function
    setValue(spreadsheet, bigBrother, 'D12', 'Disabled');
    setStatus(spreadsheet, 'Done')
  };
};

// Imports every match of every team for the event specified in 'Big Brother'from TBA, and puts it into the sheet
function ImportTeamsMatches(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  if(getValue(spreadsheet, bigBrother, 'B15') == 1){
   
    // Import Teams
    ImportTeams()
  
    //Define all of the areas of data that we need
    var matchTypes = [];
    var allMatchNumbers = [4];
    var numberOfTeams = 0;
  
    //Clear old match data
    setStatus(spreadsheet, "Clearing team's matches")
    ClearTeamsMatches(spreadsheet)
    
    setStatus(spreadsheet, "Importing team's matched from TBA")
   
    // Import matches //
    
    //Get event key from TBA Import sheet
    var eventKey = getEventKey(spreadsheet);
    
    //Get the number of teams to determen how manny times the folowing for loop needs to run
    var numberOfTeams = getValue(spreadsheet, teamsMatches, 'D105');
    var endRow = 3 + numberOfTeams;
    var allTeams = getValues(spreadsheet, teamsMatches, 'C4', 'C' + endRow);
    
    // Go though all of the teams, and import their matches
    for(var a = 0; a < numberOfTeams; a++){
      matchNumbers = [];
      
      //Reset arays
      matchNumbers.length = 0;
      matchTypes.length = 0;
    
      //Get the next team number
      //var teamCell = a + 4;
      var teamNumber = allTeams[a][0]
    
      //Pull the data from TBA  
      var tbaImportJSON = importTBA("/team/frc"+teamNumber+"/event/"+eventKey+"/matches")
  
      //Get the spcific data that we want
      for(var j = 0; j < tbaImportJSON.length; j++){
        var z = tbaImportJSON[j].comp_level.toString()
        if(z.indexOf("qm")>-1){
          matchNumbers.push([tbaImportJSON[j].match_number]);
          matchTypes.push([tbaImportJSON[j].comp_level]);
        }
      }
      
      //Sort the data
      matchNumbers.sort(function(a, b){return a - b});
      
      // Fill up the rest of the aray with empty strings
      for(var x = matchNumbers.length; x < 15; x++) {
        matchNumbers[x] = "";
      }
      
      // Store the data in a master 2D array
      allMatchNumbers[a] = matchNumbers;
      
      // Delete the varable
      delete matchNumbers;
    }
    // Put the data into the sheet
    setValues(spreadsheet, teamsMatches, 'D4', 'R' + endRow, allMatchNumbers);
    
    //Disable Function
    setValue(spreadsheet, bigBrother, 'D15', 'Disabled');
    setStatus(spreadsheet, 'Done');
  }
}

function importTBA(urlEnd){
    var url = "https://www.thebluealliance.com/api/v3" + urlEnd;
    var options = {
      "method": "GET",
      "headers": {
        "X-TBA-Auth-Key": getTBAKey()
      },
      "payload": {
      }
    };
    var jsonInport = JSON.parse(UrlFetchApp.fetch(url, options));
    Logger.log(jsonInport);
    return (jsonInport);
}

function setStatus(spreadsheet, text){
  setValue(spreadsheet, bigBrother, 'E16', text);
}

function getEventKey(spreadsheet){
  return getValue(spreadsheet, bigBrother, 'E13');
}
function getTBAKey(){
  return "ElyWdtB6HR7EiwdDXFmX2PDXQans0OMq83cdBcOhwri2TTXdMeYflYARvlbDxYe6";
}




