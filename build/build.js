const fs = require('fs');
const path = require('path');

const languageSourcePath = './src/language';
const suffix = '.json';
const parentDir = path.dirname(__dirname);

const htmlTemplate = fs.readFileSync('./index.html', 'utf8');

function buildHTML(file) {
    const filepath = path.join(parentDir, languageSourcePath, file);
    const outputFilename = 'index-' + path.basename(file, suffix) + '.html';
    const outputFilepath = path.join(parentDir, 'dist', outputFilename);

    const languageFile = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    const map = getMap(languageFile);

    let parsedTemplate = htmlTemplate;
    for (let key in map) {
        parsedTemplate = parsedTemplate.replace(key, map[key]);
    }

    fs.writeFileSync(outputFilepath, parsedTemplate, { encoding: 'utf8' } )
}

function getMap(file) {
    return {
        "main-title": file.title,
        "main-date": file.date,
        "main-location": file.location,
        "intro-txt": file.intro.txt,
        "intro-date": file.intro.date,
        "intro-location": file.intro.location,
        "intro-guests": file.intro.guests,
        "registration-title": file.registration.title,
        "add-guest-button": file.registration.button
    };
}

const files = fs.readdirSync(languageSourcePath).filter(file => path.extname(file) == suffix);

for (let file of files) {
    buildHTML(file)
}


// copy css and otehr references


// uglify with npm
