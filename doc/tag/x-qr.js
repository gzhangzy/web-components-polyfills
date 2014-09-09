require(['QRCode'], function(QRCode) {
  var xProto = Object.create(HTMLElement.prototype);
  xProto.createdCallback = function() {
    if(this.getAttribute('format')==='png') {
      var url = QRCode.generatePNG(this.getAttribute('data'));
      var img = document.createElement('img');
      img.src = url;
      this.appendChild(img);
    }
    else {
      var div = QRCode.generateHTML(this.getAttribute('data'));
      this.appendChild(div);
    }
  };
  document.registerElement('x-qr', {prototype: xProto});
});
