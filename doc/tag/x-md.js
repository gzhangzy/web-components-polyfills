require(['marked'], function(marked) {
  var xProto = Object.create(HTMLElement.prototype);
  xProto.createdCallback = function() {
    var attrs = ['gfm', 'tables', 'breaks', 'pedantic', 'sanitize', 'smartLists', 'smartypants'];
    var options = {};
    for(var i in attrs) {
      var attr = this.getAttribute(attrs[i]);
      if(attr) options[attrs[i]] = attr.toLowerCase()==='true';
    }
    this.innerHTML = marked(this.textContent, options);
  };
  document.registerElement('x-md', {prototype: xProto});
});
