///////////// All functions that import data from TBA /////////////

// Gets the start times of every match from the event specified in 'Big Brother', and puts them into the spreadsheet, so they can be made into twitch links
function getTimes() {
  // Clear old Times
  setStatus('Clear old Times');
  SpreadsheetApp.getActive().getActiveSheet().getRange('Match Schedule!AJ4:AL152').clearContent();
  
  /// Pull from TBA ///
  setStatus('Importing Match Times');
  
  // Get the event key from the spreadsheet
  var eventKey = getEventKey();
  
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
  SpreadsheetApp.getActiveSheet().getRange('Match Schedule!AL4:AL' + (match_numbers.length+3)).setValues(match_numbers);
  SpreadsheetApp.getActiveSheet().getRange('Match Schedule!AK4:AK' + (match_types.length+3)).setValues(match_types);
  SpreadsheetApp.getActiveSheet().getRange('Match Schedule!AJ4:AJ' + (match_time.length+3)).setValues(match_time);
  setStatus('Done')
}

// Imports the math schedule for the event specified in 'Big Brother' from TBA, and puts it into the sheet
function ImportSchedule() {
  
  // If the function is 'enabled' in the big brother sheet, then run the code
  if(SpreadsheetApp.getActiveSheet().getRange('Big Brother!B18').getValue() == 1){
   
    //Clear old match data
    setStatus('Clearing match schedule')
    ClearMatchSchedule();
  
    // Get the event key from the spreadsheet
    var eventKey = getEventKey();
  
    //Import schedule
    setStatus('Importing schedule from TBA')
    var urlB = "https://www.thebluealliance.com/api/v3/event/"+eventKey+"/matches";
    var optionsA = {
      "method": "GET",
      "headers": {
        "X-TBA-Auth-Key": "ElyWdtB6HR7EiwdDXFmX2PDXQans0OMq83cdBcOhwri2TTXdMeYflYARvlbDxYe6"
      },
      "payload": {
      }
     };
    var tbaImportJSON = JSON.parse(UrlFetchApp.fetch(urlB, optionsA));
    
    Logger.log(tbaImportJSON);
  
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
    SpreadsheetApp.getActiveSheet().getRange('Match Schedule!D2:D' + (redOne.length+1)).setValues(redOne);
    SpreadsheetApp.getActiveSheet().getRange('Match Schedule!E2:E' + (redTwo.length+1)).setValues(redTwo);
    SpreadsheetApp.getActiveSheet().getRange('Match Schedule!F2:F' + (redThree.length+1)).setValues(redThree);  
  
    SpreadsheetApp.getActiveSheet().getRange('Match Schedule!G2:G' + (blueOne.length+1)).setValues(blueOne);  
    SpreadsheetApp.getActiveSheet().getRange('Match Schedule!H2:H' + (blueTwo.length+1)).setValues(blueTwo);  
    SpreadsheetApp.getActiveSheet().getRange('Match Schedule!I2:I' + (blueThree.length+1)).setValues(blueThree);  
  
    SpreadsheetApp.getActiveSheet().getRange('Match Schedule!C2:C' + (matchNumber.length+1)).setValues(matchNumber);
    SpreadsheetApp.getActiveSheet().getRange('Match Schedule!B2:B' + (matchType.length+1)).setValues(matchType); 
    //Disable Function
    SpreadsheetApp.getActiveSheet().getRange('Big Brother!D18').setValue('Disabled');
    setStatus('Done')
  }
}

// Imports a list of teams for the event specified in 'Big Brother'from TBA, and puts it into the sheet
function ImportTeams() {
  
  if(SpreadsheetApp.getActiveSheet().getRange('Big Brother!B12').getValue() == 1){
  
  var listOfTeams = [];
  
  //Clear old data
  setStatus('Clearing list of teams')
  ClearTeams()
  
  //Get event key from TBA Import sheet
  var eventKey = SpreadsheetApp.getActiveSheet().getRange('Big Brother!E13').getValue();
  
  //Import teams
  setStatus('Importing teams from TBA')
  var urlA = "https://www.thebluealliance.com/api/v3/event/"+eventKey+"/teams";
    var optionsA = {
      "method": "GET",
      "headers": {
        "X-TBA-Auth-Key": "ElyWdtB6HR7EiwdDXFmX2PDXQans0OMq83cdBcOhwri2TTXdMeYflYARvlbDxYe6"
      },
      "payload": {
      }
    };
    var tbaImport1 = JSON.parse(UrlFetchApp.fetch(urlA, optionsA));
    
  Logger.log(tbaImport1);
  
    for(var j = 0; j < tbaImport1.length ; j++){
      listOfTeams.push([tbaImport1[j].team_number]); 
    }
    
  //Sort data
  listOfTeams.sort(function(a, b){return a - b});
  
  //Put the team numbers into the sheet
  SpreadsheetApp.getActiveSheet().getRange('Team Matches!C4:C' + (listOfTeams.length+3)).setValues(listOfTeams);
  
  //Disable Function
  SpreadsheetApp.getActiveSheet().getRange('Big Brother!D12').setValue('Disabled');
  setStatus('Done')
  };
  };

// Imports every match of every team for the event specified in 'Big Brother'from TBA, and puts it into the sheet
function ImportTeamsMatches(){
  
  if(SpreadsheetApp.getActiveSheet().getRange('Big Brother!B15').getValue() == 1){
  ImportTeams()
  
  //Define all of the areas of data that we need
  var matchNumbers = [];
  var matchTypes = [];
  
  //Clear old match data
  setStatus("Clearing team's matches")
  ClearTeamsMatches()
  
  setStatus("Importing team's matched from TBA")
  //Get event key from TBA Import sheet
  var eventKey = SpreadsheetApp.getActiveSheet().getRange('Big Brother!E13').getValue();
  
  
  //Import matches
  
  //Get the number of teams to determen how manny times the folowing for loop needs to run
  var numberOfTeams = SpreadsheetApp.getActiveSheet().getRange('Team Matches!D105').getValue();
  //Import matches loop, this is where we get the match data for every team
  
  
  for(var a = 0; a < numberOfTeams; a++){
    
    //Reset arays
    matchNumbers.length = 0;
    matchTypes.length = 0;
    
    //Get the next team number
    var teamCell = a + 4;
    var teamNumber = SpreadsheetApp.getActiveSheet().getRange('Team Matches!C'+teamCell).getValue();
    
    setStatus('Imporing team '+ teamNumber + "'s matches")
    
    //Pull the data from TBA  
    var url = "https://www.thebluealliance.com/api/v3/team/frc"+teamNumber+"/event/"+eventKey+"/matches";
    var options = {
      "method": "GET",
      "headers": {
        "X-TBA-Auth-Key": "ElyWdtB6HR7EiwdDXFmX2PDXQans0OMq83cdBcOhwri2TTXdMeYflYARvlbDxYe6"
      },
      "payload": {
      }
    };
    var tbaImport2 = JSON.parse(UrlFetchApp.fetch(url, options));
  
    //Log the response  
    Logger.log(tbaImport2);
  
    //Get the spcific data that we want
    for(var j = 0; j < tbaImport2.length; j++){
     var z = tbaImport2[j].comp_level.toString()
     if(z.indexOf("qm")>-1){
       matchNumbers.push([tbaImport2[j].match_number]);
       matchTypes.push([tbaImport2[j].comp_level]);
    }
    }
    //Sort the data
    matchNumbers.sort(function(a, b){return a - b});
    
    //Put the data in the sheet  
    var rowInTeamsSheet = a + 4; 
    var ceell = matchNumbers.length; 
    var columnInTeamsSheet = SpreadsheetApp.getActiveSheet().getRange('Team Matches!F'+(ceell+104)).getValue();
    SpreadsheetApp.getActiveSheet().getRange('Team Matches!D'+rowInTeamsSheet+':'+columnInTeamsSheet+rowInTeamsSheet).setValues([matchNumbers]);
  }
  //Disable Function
  SpreadsheetApp.getActiveSheet().getRange('Big Brother!D15').setValue('Disabled');
  setStatus('Done')
}
}

function importTBA(urlEnd){
    var url = "https://www.thebluealliance.com/api/v3" + urlEnd;
    var options = {
      "method": "GET",
      "headers": {
        "X-TBA-Auth-Key": "ElyWdtB6HR7EiwdDXFmX2PDXQans0OMq83cdBcOhwri2TTXdMeYflYARvlbDxYe6"
      },
      "payload": {
      }
    };
    var jsonInport = JSON.parse(UrlFetchApp.fetch(url, options));
    Logger.log(jsonInport);
    return (jsonInport);
}

function setStatus(text){
  SpreadsheetApp.getActiveSheet().getRange('Big Brother!E16').setValue(text);
}

function getEventKey(){
  return SpreadsheetApp.getActiveSheet().getRange('Big Brother!E13').getValue();
}




