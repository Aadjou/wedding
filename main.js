// ES5

var guestList = document.getElementById('guests');
var contributionList = document.getElementById('contributions');
var guestTemplate = document.getElementById('person').content;
var contributionTemplate = document.getElementById('contribution').content;

function addGuest() {
    var guestForm = document.importNode(guestTemplate, true);
    guestList.appendChild(guestForm);
}

function addContribution() {
    var contributionForm = document.importNode(contributionTemplate, true);
    contributionList.appendChild(contributionForm);
}

function initialize() {
    addGuest()
    addContribution()
}

initialize()

document.getElementById('add-guest').addEventListener('click', addGuest);
document.getElementById('add-contribution').addEventListener('click', addContribution);