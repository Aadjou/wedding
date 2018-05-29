const fs = require('fs');
const path = require('path');

const languageSourcePath = './src/language';
const suffix = '.json';
const parentDir = path.dirname(__dirname)

const htmlTemplate = fs.readFileSync('./index.html', 'utf8')

function buildHTML(file) {
    const filepath = path.join(parentDir, languageSourcePath, file)
    const outputFilename = 'index-' + path.basename(file, suffix) + '.html';
    const outputFilepath = path.join(parentDir, 'dist', outputFilename);

    const languageFile = JSON.parse(fs.readFileSync(filepath, 'utf8'));

    // Todo parse and replace
    //const map = {
    //    "intro-txt"
    //}
    let parsedTemplate = htmlTemplate.replace('intro-txt', languageFile.intro.txt);

    fs.writeFileSync(outputFilepath, parsedTemplate, { encoding: 'utf8' } )
}

const files = fs.readdirSync(languageSourcePath).filter(file => path.extname(file) == suffix);

for (let file of files) {
    buildHTML(file)
}


// copy css and otehr references


// uglify with npm
