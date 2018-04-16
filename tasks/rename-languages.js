var fs = require('fs');
var path = require('path');
var hugoLanguages = ["ca", "es", "en"];

var walk = function(dir, done) {
  var results = [];

  fs.readdir(dir, function(err, list) {
    if (err) return done(err);

    var pending = list.length;
    if (!pending) return done(null, results);

    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });

  });

};

//Renames netlifycms language files with "-[lang].md" to ".[lang].md"
walk("../content", function(err, results){
  if(err){
    console.log("error");
    return;
  }

  var pos;
  for(var i=0, z=results.length; i<z; i++){
    for(var l=0, ls=hugoLanguages.length; l<ls; l++){
      pos = results[i].indexOf("-"+hugoLanguages[l]+".md");
      if(pos>-1){
        fs.rename(results[i], results[i].slice(0,pos)+"."+hugoLanguages[l]+".md", function(err) {
            if(err){
              console.log('Error: ' + err);
            }
        });
      }
    }
  }
})