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