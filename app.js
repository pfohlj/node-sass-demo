var express = require('express');
var sass = require('node-sass');
var fs = require('fs');
var app = express();

app.get('/', function(req, res) {
    // set options for compiling .scss file
    var in_file = __dirname + '/index.scss';
    var out_file = __dirname + '/index.css';

    // render the scss file and write to disk
    sass.render({
        file: in_file,
        outFile: out_file,
    }, function(error, result) {
        if(!error) {
            fs.writeFile(out_file, result.css, function(err) {
                if(!err) {
                    console.log("Compiled and written to disc successfully.");
                } else {
                    console.log("Your file compiled but could not be written to disc.")
                }
            });
        } else {
            console.log('There was a problem compiling your file.');
        }
    });

    // set options for sending index file
    var options = {
        root: __dirname + ''
    };

    res.sendFile('index.html', options);
});

app.get('/index.css', function(req, res) {
    
    var options = {
        root: __dirname + ''
    };

    res.sendFile('index.css', options);
});

app.listen(8080, function() {
    console.log('Node-sass app listening on port 8080!; Press Ctrl-C to terminate.')
});