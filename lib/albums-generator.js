'use strict';

var fs = require('fs')
var ejs = require('ejs');
var path = require('path');
var log = require('hexo-log')({
    debug: false,
    silent: false
});


module.exports = function (locals) {
    var startTime = new Date().getTime();
    var config = this.config;
    var json = fs.readFileSync(path.join(process.cwd(), config.albums.file));
    var albums = JSON.parse(json)
    var ejsFile = path.join(__dirname, '/templates/albums.ejs');
    var contents = ejs.renderFile(ejsFile, { 'albums': albums }, function (err, result) {
        if (err) console.error(err);
        return result;
    });
    var endTime = new Date().getTime();
    console.info("%d albums have been generated in %d ms.", albums.length, (endTime - startTime))

    return {
        path: 'albums/index.html',
        data: {
            title: config.albums.title,
            content: contents,
            slug: 'albums'
        },
        layout: ['page', 'post']
    };
};

