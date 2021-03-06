var vows = require('vows'),
    assert = require('assert'),
    path = require('path'),
    jade = require('jade'),
    suite = vows.describe('Jade bundler'),
    jadeBundler = require('jadeBundler');
    
// Expose jade so evals can run
global.jade = jade;

suite.addBatch({
  'Jade bundler': {
    'is an object': function () {
      assert(typeof jadeBundler === 'object');
    },
    'importing a single directory': {
      topic: function () {
        jadeBundler.bundle(path.join(__dirname, '/views1'));
        return jadeBundler;
      },
      'reads in every file': function () {
        var views = jadeBundler.views;
        assert(typeof views.view1 === 'function');
        assert(typeof views.view2 === 'function');
      },
      'exporting its current files': {
        topic: function () {
          return jadeBundler.exportJson();
        },
        'exports every view': function (viewJson) {
          assert(typeof viewJson === 'string');
          var views;
          eval('var views = ' + viewJson);
          assert(typeof views.view1 === 'function');
          assert(typeof views.view2 === 'function');
        }
      }
    }
  }
});

suite.addBatch({
  'Jade bundler': {
    topic: function () {
      // Clean out jadeBundler views
      jadeBundler.views = {};
      return jadeBundler;
    },
    'importing multiple directories': {
      topic: function () {
        jadeBundler.bundle(path.join(__dirname, '/views1'));
        jadeBundler.bundle(path.join(__dirname, '/views2'));
        return jadeBundler;
      },
      // topic
      'reads in every file': function () {
        var views = jadeBundler.views;
        assert(typeof views.view1 === 'function');
        assert(typeof views.view2 === 'function');
        assert(typeof views.view3 === 'function');
        assert(typeof views.view4 === 'function');
      }
    },
    'exporting its current files': {
      topic: function () {
        return jadeBundler.exportJson();
      },
      'exports every view': function (viewJson) {
        assert(typeof viewJson === 'string');
        var views;
        eval('var views = ' + viewJson);
        assert(typeof views.view1 === 'function');
        assert(typeof views.view2 === 'function');
        assert(typeof views.view3 === 'function');
        assert(typeof views.view4 === 'function');
      }
    }
  }
});

suite['export'](module);