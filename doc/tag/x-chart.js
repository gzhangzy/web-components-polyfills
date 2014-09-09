require(['Chart'], function(Chart) {
  var xProto = Object.create(HTMLElement.prototype);
  xProto.createdCallback = function() {
    var canvas = document.createElement('canvas');
    canvas.height = this.getAttribute('height');
    canvas.width = this.getAttribute('width');
    this.appendChild(canvas);

    switch(this.getAttribute('mode')) {
    case 'bar':
      var labels = JSON.parse(this.getAttribute('labels'));
      var values = JSON.parse(this.getAttribute('values'));
      var colors = JSON.parse(this.getAttribute('colors'));
      var datasets = [];
      for(var i in values) {
        datasets.push({
          fillColor: "rgba(" + colors[i] + ",0.5)",
          strokeColor: "rgba(" + colors[i] + ",1)",
          data: values[i]
        });
      }

      var chart = new Chart(canvas.getContext("2d"));
      chart.Bar({labels: labels, datasets: datasets});
      break;
    case 'doughnut':
      var values = JSON.parse(this.getAttribute('values'));
      var colors = JSON.parse(this.getAttribute('colors'));
      var data = [];
      for(var i in values) {
        data.push({
          color: colors[i],
          value: values[i]
        });
      }

      var chart = new Chart(canvas.getContext("2d"));
      chart.Doughnut(data);
      break;
    case 'line':
      var labels = JSON.parse(this.getAttribute('labels'));
      var values = JSON.parse(this.getAttribute('values'));
      var colors = JSON.parse(this.getAttribute('colors'));
      var datasets = [];
      for(var i in values) {
        datasets.push({
          fillColor: "rgba(" + colors[i] + ",0.5)",
          strokeColor: "rgba(" + colors[i] + ",1)",
          pointColor: "rgba(" + colors[i] + ",1)",
          pointStrokeColor: "#fff",
          data: values[i]
        });
      }

      var chart = new Chart(canvas.getContext("2d"));
      chart.Line({labels: labels, datasets: datasets});
      break;
    case 'pie':
      var values = JSON.parse(this.getAttribute('values'));
      var colors = JSON.parse(this.getAttribute('colors'));
      var data = [];
      for(var i in values) {
        data.push({
          color: colors[i],
          value: values[i]
        });
      }

      var chart = new Chart(canvas.getContext("2d"));
      chart.Pie(data);
      break;
    case 'polar-area':
      var values = JSON.parse(this.getAttribute('values'));
      var colors = JSON.parse(this.getAttribute('colors'));
      var data = [];
      for(var i in values) {
        data.push({
          color: colors[i],
          value: values[i]
        });
      }

      var chart = new Chart(canvas.getContext("2d"));
      chart.PolarArea(data);
      break;
    case 'radar':
      var labels = JSON.parse(this.getAttribute('labels'));
      var values = JSON.parse(this.getAttribute('values'));
      var colors = JSON.parse(this.getAttribute('colors'));
      var datasets = [];
      for(var i in values) {
        datasets.push({
          fillColor: "rgba(" + colors[i] + ",0.5)",
          strokeColor: "rgba(" + colors[i] + ",1)",
          pointColor: "rgba(" + colors[i] + ",1)",
          pointStrokeColor: "#fff",
          data: values[i]
        });
      }

      var chart = new Chart(canvas.getContext("2d"));
      chart.Radar({labels: labels, datasets: datasets});
      break;
    }
  };
  document.registerElement('x-chart', {prototype: xProto});
});
