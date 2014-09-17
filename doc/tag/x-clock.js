(function() {
    var proto = Object.create(HTMLElement.prototype);
    proto.createdCallback = function() {
        this.style.width = this.getAttribute('width');
        this.style.height = this.getAttribute('height');
        this.innerHTML =
            "<div class='x-clock-container'>" +
                "<div class='x-clock-hour'></div>" +
                "<div class='x-clock-minute'></div>" +
                "<div class='x-clock-second'></div>" +
            "</div>";
        this.hourElement = this.querySelector(".x-clock-hour");
        this.minuteElement = this.querySelector(".x-clock-minute");
        this.secondElement = this.querySelector(".x-clock-second");
        this.updateClock();
        setInterval(function() {
            this.updateClock();
        }.bind(this), 1000);
    };
    proto.updateClock = function() {
        var now = new Date(),
            second = now.getSeconds(),
            minute = now.getMinutes(),
            hour = now.getHours(),
            secondAngle = second * 6,
            minuteAngle = minute * 6 + second / 10,
            hourAngle = 90 + hour * 30 + minute / 2;
        this.secondElement.style.msTransform =
        this.secondElement.style.webkitTransform =
        this.secondElement.style.transform = "rotate(" + secondAngle + "deg)";
        this.minuteElement.style.msTransform =
        this.minuteElement.style.webkitTransform =
        this.minuteElement.style.transform = "rotate(" + minuteAngle + "deg)";
        this.hourElement.style.msTransform =
        this.hourElement.style.webkitTransform =
        this.hourElement.style.transform = "rotate(" + hourAngle + "deg)";
    };
    document.registerElement("x-clock", {
        prototype: proto
    });
})();
