(function() {
    var proto = Object.create(HTMLElement.prototype);
    var currentSlide = 0;
    proto.createdCallback = function() {
        this.style.background = this.getAttribute('background');
        this.style.font = this.getAttribute('font');
        this.style.color = this.getAttribute('color');
        this.style.align = this.getAttribute('align');

        var startTime = 0, sx, sy;
        var handleEvent = function(event) {
            switch(event.type) {
            case 'touchstart':
                startTime = event.timeStamp;
                sx = event.touches[0].clientX;
                sy = event.touches[0].clientY;
                break;
            case 'touchmove':
                event.preventDefault();
                if(startTime && event.timeStamp-startTime > 50) {
                    var dx = event.changedTouches[0].clientX-sx;
                    var dy = event.changedTouches[0].clientY-sy;
                    startTime = 0;
                    this.handleCode(Math.abs(dx)>Math.abs(dy) ? (dx>0 ? -1 : 1) : (dy>0 ? -1 : 1));
                }
                break;
            case 'touchend':
                startTime = 0;
                break;
            case 'keydown':
                this.handleCode(event.keyCode);
            }
        }.bind(this);

        this.addEventListener('touchstart', handleEvent, false);
        this.addEventListener('touchmove', handleEvent, false);
        this.addEventListener('touchend', handleEvent, false);
        document.addEventListener('keydown', handleEvent, false);

        var slides = this.querySelectorAll('x-slide');
        slides[currentSlide].style.opacity = 1;
    };
    proto.handleCode = function(code) {
        switch(code) {
        case 32:
        case 39:
        case +1:
            this.moveSlide(+1);
            break;
        case 37:
        case -1:
            this.moveSlide(-1);
            break;
        }
    };
    proto.moveSlide = function(step) {
        var slides = this.querySelectorAll('x-slide');
        switch(step) {
        case +1:
            var fragments = slides[currentSlide].querySelectorAll('.fragment');
            if(fragments.length <= 0) break;
            fragments[0].className = 'visible-fragment';
            return;
        case -1:
            var fragments = slides[currentSlide].querySelectorAll('.visible-fragment');
            if(fragments.length <= 0) break;
            fragments[fragments.length-1].className = 'fragment';
            return;
        }
        if(0<=currentSlide+step && currentSlide+step<slides.length) {
            slides[currentSlide].style.opacity = 0;
            currentSlide += step;
            slides[currentSlide].style.opacity = 1;
        }
    };
    document.registerElement("x-presentation", {
        prototype: proto
    });
})();
