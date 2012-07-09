JadeBundler
===========

A lightweight server-side jade compilation framework

Example
-------
```javascript
require(['js/runtime', 'js/allViews'], function (runtime, allViews) {
  var view;

  // Iterate over views
  for(view in allViews) {

    // Create a container div
    var div = document.createElement('div');
    
    // Set its content to this invoked view function
    div.innerHTML = allViews[view]({'name': 'Fred'});

    // Append it to the body
    document.body.appendChild(div);
  }
});
```