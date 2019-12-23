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

function addFormatingRule() {
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