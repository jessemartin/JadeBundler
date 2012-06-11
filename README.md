JadeBundler
===========

A lightweight server-side jade compilation framework

Example
```require(['js/runtime', 'js/allViews'], function (runtime, allViews) {
  var view;

  // Iterate over views
  for(view in allViews) {

    // Create a container div
    var div = document.createElement('div');
    
    // Set its content to this invoked view function
    div.innerHTML = allViews[view]({'name': 'Jesse'});

    // Append it to the body
    document.body.appendChild(div);
  }

  // Heh
  document.getElementById('lol').onclick = function (evt) {
    evt.preventDefault();
    window.location = 'http://www.toddwolfson.com';
  };
});