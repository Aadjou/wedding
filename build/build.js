var fs = require('fs')
// var en = require('../language/en.json')

var englishJson = JSON.parse(fs.readFileSync('./src/language/EN.json', 'utf8'));
var template = fs.readFileSync('./index.html', 'utf8')

var englishHtml = template.replace('txt_intro', englishJson.description.what);
fs.writeFileSync('./dist/index-en.html', englishHtml, { encoding: 'utf8' } )

// copy css and otehr references


// uglify with npm
