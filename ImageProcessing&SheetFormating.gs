function getPics() {
  clearContent(robotPics, 'B5', 'C104');
  
  var folder = DriveApp.getFolderById(getTargetFolderID());
  var contents = folder.getFiles();
 
  var file;
  var data = [];
  for(i = 0; true; i++) {
    try {
      file = contents.next();
    }
    catch(e) {
      break;
    }
    data[i] = [file.getName(), file.getId()]
  } 
  setValues(robotPics, 'B5', 'C' + (data.length + 4), data)
}

function getTargetFolderID() {
  return getValue(robotPics, 'H2');
}

function reformatSheet() {
  // Init
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  
  // Get the info about what format we are going from, and to
  var BKs = spreadsheet.getRange(theme + "!C3:C6").getBackgrounds()
  var newBKHeader =    BKs[0][0]
  var newBKSecond =    BKs[1][0]
  var targetBKHeader = BKs[2][0]
  var targetBKSecond = BKs[3][0]
  
  // Get a cofirm from the user
  var ui = SpreadsheetApp.getUi();  
  var result = ui.alert('Please confirm','Are you sure you want to continue? This will reformat the entire sheet, and take ~3min to compleate.',ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.NO) {
    return;
  }

  // Bail if things will cause problems, or is uneccicary
  if(newBKHeader == newBKSecond || targetBKHeader == targetBKSecond || (targetBKHeader == newBKHeader && targetBKSecond == newBKSecond)) {
    return;
  }
  if(newBKHeader == blueColor || newBKSecond == blueColor || targetBKHeader == blueColor || targetBKSecond == blueColor) {
    return;
  }
  if(newBKHeader == redColor || newBKSecond == redColor || targetBKHeader == redColor || targetBKSecond == redColor) {
    return;
  }
  if(getValue(theme, 'E2') == "Disabled") {
    return;
  }
  
  // Loop though every cell in every sheet
  for(var k = 0; k < sheets.length; k++) {
    var sheet = sheets[k]
    var backrounds = sheet.getDataRange().getBackgrounds()
    var name = sheet.getName()
    if(name != picklist) {
      for(var i = 0; i < backrounds.length; i++) {
        for(var j = 0; j < backrounds[i].length; j++) {
          if(backrounds[i][j] == targetBKHeader) {
            sheet.getRange(i + 1,j + 1).setBackground(newBKHeader)
          } else if(backrounds[i][j] == targetBKSecond) {
            sheet.getRange(i + 1,j + 1).setBackground(newBKSecond)
          }
        }
      }
    }
  }
}

function addFormatingRule() {
  return;
  //var sheets = ["Sheet342"];
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var out = [];
  for (var i=0 ; i<sheets.length ; i++) out.push( [ sheets[i].getName() ] )
  sheets = out;
  for(var i = 0; i < sheets.length; i++) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheets[i]);
    var numRows = sheet.getMaxRows();
    var numCols = sheet.getMaxColumns();
    var range = sheet.getRange(1,1, numRows, numCols);
    var rule = SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=INDIRECT("Big Brother!B1")')
      .setBackground("black")
      .setFontColor("black")
      .setRanges([range])
      .build();        
    var rules = sheet.getConditionalFormatRules();
    rules.push(rule);
    sheet.setConditionalFormatRules(rules);
  }
}