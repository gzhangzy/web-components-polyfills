(function() {
    var proto = Object.create(HTMLElement.prototype);
    proto.createdCallback = function() {
        this.style.background = this.getAttribute('background');
        this.style.font = this.getAttribute('font');
        this.style.color = this.getAttribute('color');
        this.style.align = this.getAttribute('align');
        this.innerHTML = "<div width='100%'>" + this.innerHTML + "</div>";
    };
    document.registerElement("x-slide", {
        prototype: proto
    });
})();
