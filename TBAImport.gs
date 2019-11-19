///////////// All functions that import data from TBA /////////////

// Gets the start times of every match from the event specified in 'Big Brother', and puts them into the spreadsheet, so they can be made into twitch links
function getTimes() {
  SpreadsheetApp.getActive().getActiveSheet().getRange('Match Schedule!AJ4:AL152').clearContent();
  
  var match_numbers = [];
  var match_types = [];
  var match_time = [];
  
  var eventKey = SpreadsheetApp.getActiveSheet().getRange('Big Brother!E13').getValue();
  var url = "https://www.thebluealliance.com/api/v3/event/"+eventKey+"/matches";
  
    var optionsA = {
      "method": "GET",
      "headers": {
        "X-TBA-Auth-Key": "ElyWdtB6HR7EiwdDXFmX2PDXQans0OMq83cdBcOhwri2TTXdMeYflYARvlbDxYe6"
      },
      "payload": {
      }
    };
    var tbaImport1 = JSON.parse(UrlFetchApp.fetch(url, optionsA));
    
  Logger.log(tbaImport1);
  
    for(var j = 0; j < tbaImport1.length ; j++){
      match_numbers.push([tbaImport1[j].match_number]);  //actual_time
      match_types.push([tbaImport1[j].comp_level]);  //actual_time
      match_time.push([tbaImport1[j].actual_time]);  //actual_time
    }
  
  //Put the team numbers into the sheet
  SpreadsheetApp.getActiveSheet().getRange('Match Schedule!AL4:AL' + (match_numbers.length+3)).setValues(match_numbers);
  SpreadsheetApp.getActiveSheet().getRange('Match Schedule!AK4:AK' + (match_types.length+3)).setValues(match_types);
  SpreadsheetApp.getActiveSheet().getRange('Match Schedule!AJ4:AJ' + (match_time.length+3)).setValues(match_time);
}

// Imports the math schedule for the event specified in 'Big Brother' from TBA, and puts it into the sheet
function ImportSchedule() {
   
  if(SpreadsheetApp.getActiveSheet().getRange('Big Brother!B18').getValue() == 1){
   
  //Clear old match data
  ClearMatchSchedule();
  
  var redOne = [];
  var redTwo = [];
  var redThree = [];
  
  var blueOne = [];
  var blueTwo = [];
  var blueThree = [];
  
  var matchNumber = [];
  var matchType = [];
  
   var eventKey = SpreadsheetApp.getActiveSheet().getRange('Big Brother!E13').getValue();
  
  //Import schedule
  
  var urlB = "https://www.thebluealliance.com/api/v3/event/"+eventKey+"/matches";
    var optionsA = {
      "method": "GET",
      "headers": {
        "X-TBA-Auth-Key": "ElyWdtB6HR7EiwdDXFmX2PDXQans0OMq83cdBcOhwri2TTXdMeYflYARvlbDxYe6"
      },
      "payload": {
      }
    };
    var tbaImport1 = JSON.parse(UrlFetchApp.fetch(urlB, optionsA));
    
  Logger.log(tbaImport1);
  
    for(var j = 0; j < tbaImport1.length; j++){
      redOne.push([tbaImport1[j].alliances.red.team_keys]);
      redTwo.push([tbaImport1[j].alliances.red.team_keys.slice(1, 2)]);
      redThree.push([tbaImport1[j].alliances.red.team_keys.slice(2, 3)]);
  
      blueOne.push([tbaImport1[j].alliances.blue.team_keys]);
      blueTwo.push([tbaImport1[j].alliances.blue.team_keys.slice(1, 2)]);
      blueThree.push([tbaImport1[j].alliances.blue.team_keys.slice(2, 3)]);
      
      matchNumber.push([tbaImport1[j].match_number]);
      matchType.push([tbaImport1[j].comp_level]);
      
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
}
}

// Imports a list of teams for the event specified in 'Big Brother'from TBA, and puts it into the sheet
function ImportTeams() {
  
  if(SpreadsheetApp.getActiveSheet().getRange('Big Brother!B12').getValue() == 1){
  
     var listOfTeams = [];
  
  //Clear old data
  ClearTeams()
  
  //Get event key from TBA Import sheet
  var eventKey = SpreadsheetApp.getActiveSheet().getRange('Big Brother!E13').getValue();
  
  //Import teams
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
  ClearTeamsMatches()

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
}
}
 

