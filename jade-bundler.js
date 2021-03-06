var jade = require('jade'),
  fs = require('fs'),
  path = require('path');

module.exports = {
  'views': {},
  // Export the current views as a JSON object
  'exportJson': function () {
    var viewObj = this.views,
      viewNames = Object.getOwnPropertyNames(viewObj),
      viewArr = viewNames.map(function (viewName) {
        var escName,
          viewFn = viewObj[viewName],

        // Convert it to a string
        viewStr = viewFn.toString();

        // Remove the 'anonymous' name from the function
        viewStr = viewStr.replace(/function\s+anonymous\(/, 'function (');

        // Escape and wrap the viewName in quotes
        escName = JSON.stringify(viewName);

        // Return the key-value pair of viewStr
        return escName + ':' + viewStr;
      }),
      viewJson = '{' + viewArr.join(',') + '}';

    // Return the JSON with functions
    return viewJson;
  },
  // Helper method that writes a file for require.js
  // TODO: Figure out how to make this better (should have a set of engines)
  // TODO: Minify the output code (have a config on module.exports for that)
  'writeTo': function (filename) {
    var viewJson = this.exportJson();

    // Create views file
    fs.writeFileSync(filename, 'define(' + viewJson + ');', 'utf8');
  },
  // 'add': function (view) {
    // // Detect if the view is a file or a directory
      // // and use the appropriate method
  // },
  // 'addFile': function (viewPath) {
    // TODO: Use the 'eachFilePath' function from 'bundle'

  // },
  // 'addDir': function (viewDir) {
  'bundle': function (viewDir) {
    var viewObj = this.views;

    // Read views dir
    // TODO: Use this.addFile
    fs.readdirSync(viewDir).forEach(function eachFilePath (fileName) {

      // Populate viewObj object with jade function
      var filePath = path.join(viewDir, fileName),
          fileContents = fs.readFileSync(filePath, 'utf8');

      // Extract filename without extension (to be used as key)
      var template = path.basename(fileName, '.jade');

      // Compile template and store it in the view object
      viewObj[template] = jade.compile(fileContents, {client: true});
    });

    // Return the JSON object
    return viewObj;
  }
};
