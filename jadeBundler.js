var jade = require('jade'),
  fs = require('fs'),
  path = require('path');

module.exports = {
  'views': {},
  'ship': function (filename) {
    var viewObj = this.views,
      view,
      i = 0,
      fileContents = '',
      viewKeys = Object.getOwnPropertyNames(viewObj),
      length = viewKeys.length;

    // Reformat views object for define()
    for(view in viewObj) {

      // Add viewname key and non-stringified function (we want to avoid eval)
      fileContents += "'" + view + "': " + viewObj[view];

      // If not at the last element
      if(i !== length - 1) {

        // Add a comma
        fileContents += ', ';
      }
      i++;
    }

    // Create views file
    fs.writeFileSync(filename, 'define({' + fileContents + '});', 'utf8');
  },
  'bundle': function (viewDir) {
    var viewObj = this.views;

    // Read views dir
    fs.readdirSync(viewDir).forEach(function eachFilePath (filePath) {

      // Populate viewObj object with jade function
      var fileContents = fs.readFileSync(viewDir + '/' + filePath);

      // Extract filename without extension (to be used as key)
      var template = path.basename(filePath, '.jade');

      // Compile template and store it in the view object
      viewObj[template] = jade.compile(fileContents, {client: true});
    });

    // Save viewObj in this.views
    this.views = viewObj;

    // Return the JSON object
    return viewObj;
  }
};
