var express = require('express');
var sass = require('node-sass');
var fs = require('fs');

var app = express();

app.get('/', function(req, res) {
    // set options for compiling .scss file
    var in_file = __dirname + '/test.scss';
    var out_file = __dirname + '/test.css';

    // compile the .scss file using sass's render method
    sass.render({
        file: in_file,
        outFile: out_file,
    }, function(error, result) {
        if (!error) {
            fs.writeFile(out_file, result.css, function(err) {
                if (!err) {
                    console.log("Sass compiled and written to file.");
                } else {
                    console.log("File compiled, but could not write to disc.    ");
                }
            });
        } else {
            console.log('There was a problem with compilation.');
        }
    });

    var options = {
        root: __dirname + '',
    };

    res.sendFile('index.html', options);
});

app.get('/test.css', function(req, res) {
    var options = {
        root: __dirname + ''
    };

    res.sendFile('test.css', options);
});

app.listen(8080, function() {
    console.log('Node-sass app listening on port 8080!; Press Ctrl-C to terminate.')
});