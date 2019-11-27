// Runs when ever anyone posts to this sheets web app link
function doPost(e) {
  var command = e.parameter.command;
  if(command == enterDataCommand) {
    enterAllData();
  }
}