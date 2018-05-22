// ES5

var guestList = document.getElementById('guests');
var guestTemplate = document.getElementById('person').content;

function addGuest() {
    var guestForm = document.importNode(guestTemplate, true);
    guestList.appendChild(guestForm);
}

addGuest()
document.getElementById('add-guest').addEventListener('click', addGuest);