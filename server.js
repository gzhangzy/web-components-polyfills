var http= require('http');
var cgi = require('ngi');
var fs  = require('fs');

function getFiles(id, ext) {
    var files = [];
    for(var i in id) {
        var file = 'doc/tag/' + id[i] + ext;
        var stats = fs.statSync(file);
        stats && stats.isFile() && files.push(file);
    }
    return files;
}

function concat(files, res) {
    (function output() {
        var f = files.shift();
        if(f) {
            var reader = fs.createReadStream(f);
            reader.pipe(res, {end: false});
            reader.on('end', output);
        }
        else res.end();
    })();
}

var map = {
    bin : {
        '/x-tags.js': function(req, res) {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            concat(getFiles(req.body.id.split(','), '.js'), res);
        },
        '/x-tags.css': function(req, res) {
            res.writeHead(200, {'Content-Type': 'text/css'});
            concat(getFiles(req.body.id.split(','), '.css'), res);
        }
    },
    exp : {
    },
    doc : 'doc'
};

http.createServer(cgi.route(map)).listen(80);
