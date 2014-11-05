/*jshint node: true*/
var express = require('express');
var bp = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bp.json());

app.route('/:some_name')

    .get(function( req, res) {
        var file = ('./db/' + req.params.some_name + '.json');
        var stream = fs.createReadStream(file);
        stream.on('error', function(err) {
            console.log('Error', err);
            res.send(err);
        });
        stream.on('readable', function() {
            res.writeHead(200, {"Content-Type": "application/json"});
            stream.pipe(res);
        });
    })

    .post(function( req, res) {
        res.writeHead(200);
        var ws = fs.createWriteStream('./db/' + req.params.some_name + '.json');
        ws.write(JSON.stringify(req.body));
        ws.end();
        res.end();
    });

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server up");
});