const fs = require('fs');
const path = require('path');

const languageSourcePath = './src/language';
const suffix = '.json';
const parentDir = path.dirname(__dirname);
const distDir = path.join(parentDir, 'dist');

const htmlTemplate = fs.readFileSync('./index-template.html', 'utf8');
const references = ['./index.html', './style.css', './main.js'];

function buildHTML(file) {
    const filepath = path.join(parentDir, languageSourcePath, file);
    const outputFilename = 'index-' + path.basename(file, suffix) + '.html';
    const outputFilepath = path.join(distDir, outputFilename);

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
        "p-name": file.registration.name,
        "p-rsvp": file.registration.rsvp.description,
        "rsvp-yes": file.registration.rsvp.yes,
        "rsvp-no": file.registration.rsvp.no,
        "rsvp-maybe": file.registration.rsvp.maybe,
        "rsvp-undecided": file.registration.rsvp.undecided,
        "rsvp-accommodation": file.registration.rsvp.accommodation,
        "registration-title": file.registration.title,
        "registration-description": file.registration.description,
        "registration-email": file.registration.email,
        "add-guest-button": file.registration.button
    };
}

function copyReferences() {
    // Copy CSS
    for (let ref of references) {
        fs.copyFileSync(ref, path.join(distDir, path.basename(ref)));
    }
}


const files = fs.readdirSync(languageSourcePath).filter(file => path.extname(file) == suffix);

for (let file of files) {
    buildHTML(file)
}

copyReferences();



// uglify with npm

// change language attribute
