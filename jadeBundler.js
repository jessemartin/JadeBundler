var jade = require('jade'),
  fs = require('fs'),
  path = require('path');

module.exports = {
  'views': {},
  'ship': function (filename) {
    var viewObj = this.views,
      view,
      i = 0,
      viewJson = JSON.stringify(viewObj);

    // Create views file
    fs.writeFileSync(filename, 'define(' + viewJson + ');', 'utf8');
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
