// Business Logic for AddressBook ----
function AddressBook() {
  this.contacts = []
  this.currentId = 0 //each time a new AddressBook is created, it will have a currentId property that begins at 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId(); //calls new assignId method whenever a new Contact is added to the AddressBook
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() { //uses currentId iteration number as ref creates unique ID for each new Contact
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];//method loops through AddressBook object's contacts array, checking each id against the id provided to the findContact() method as an argument. When a match is found the method returns the Contact object with that specific id
      }
    }
  };
  return false; //use a for loop instead of a forEach. This is because we want to stop looping as soon as we find a matching id. If there's a Contact with a matching id, it returns the Contact. If there isn't, it returns false because there's no match.
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for contacts ---


function Contact(firstName, lastName, phoneNumber, address, emailList) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.address = address
  this.emailList = (function Email(personalEmail, workEmail) {
    this.personalEmail = personalEmail
    this.workEmail = workEmail
  })
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.emailList = function () {
  return this.personalEmail + "<br>" + this.workEmail;
}




//UI Logic -----
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts"); //saves jQuery ul#contacts element in a variable to prevent it from later querying the DOM again if we use the selector again
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  }); // We create a list of all elements we want to append to the DOM, and add them all at once instead of one a time. This is also faster and more efficient.
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".personal-email").html(contact.personalEmail);
  $(".work-email").html(contact.workEmail);
  $(".address").html(contact.address);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

function attachContactListeners() {

  $("ul#contacts").on("click", "li", function() {
    //console.log("The id of this <li> is " + this.id + ".");
    showContact(this.id); //this refers to the li by a specific ID. Next pass the contact into showContact function
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });

};

$(document).ready(function() {
  attachContactListeners ();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedPersonalEmail = $("input#new-personal-email").val();
    var inputtedWorkEmail = $("input#new-work-email").val();
    var inputtedAddress = $("input#new-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-personal-email").val("");
    $("input#new-work-email").val("");
    $("input#new-address").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedPersonalEmail, inputtedWorkEmail, inputtedAddress);
    addressBook.addContact(newContact);
    //console.log(addressBook.contacts);
    displayContactDetails(addressBook); //replaces console.log above
  })
})
