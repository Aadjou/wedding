const fs = require('fs');
const path = require('path');

const languageFiles = './src/language';
const suffix = '.json';
const dir = path.dirname(__dirname)

const template = fs.readFileSync('./index.html', 'utf8')


function buildHTML(file) {
    const filepath = path.join(dir, languageFiles, file)
    const outputFilename = 'index-' + path.basename(file, suffix) + '.html';
    const outputFilepath = path.join(dir, 'dist', outputFilename);

    const languageFile = JSON.parse(fs.readFileSync(filepath, 'utf8'));

    // Todo parse and replace
    let parsedTemplate = template.replace('txt_intro', languageFile.description.what);

    fs.writeFileSync(outputFilepath, parsedTemplate, { encoding: 'utf8' } )
}

const files = fs.readdirSync(languageFiles).filter(file => path.extname(file) == suffix);

for (let file of files) {
    buildHTML(file)
}


// copy css and otehr references


// uglify with npm
