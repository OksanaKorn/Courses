// Тут ви зберігаєте записи як хочете

// var list = function(data) {
// for (var key in data) {
// alert(data[key].firstName);
// }
// };

// var search = function(name) {
// for (var key in contacts) {
// if (contacts[key].firstName === name) {
// document.write("Name: " + contacts[key].firstName + "</br>" + "Lastname: " + contacts[key].lastName + "</br>" + "Age: " + contacts[key].age + "</br>" + "Phone: " + contacts[key].phone + "</br>" + "Address: " + contacts[key].address + "</br>");
// return contacts[key];
// }
// }
// };
var contacts = [];
var phoneBook = {}; 


phoneBook.add = function (name, phone, email) {
  var contact = new Object();
  contact.contactName = name;
  contact.contactPhone = phone;
  contact.contactEmail = email;
  contacts.push(contact);
  phoneBook.contacts = contacts;
  phoneBook.showTable();
}

/*
   Функція пошуку записв в телефонній книзі.
   Пошук ведеться по всім полям.
*/

phoneBook.find = function (query) {
  var foundContacts = "";
  for (var i = 0; i < contacts.length; i++) {
  	if (contacts[i].contactName.search(query) != -1 || contacts[i].contactPhone.search(query) != -1 || contacts[i].contactEmail.search(query) != -1) {
  		foundContacts += contacts[i].contactName + ", " + contacts[i].contactPhone + ", " + contacts[i].contactEmail + "<br\>";
    }
  }
  document.getElementById("found").innerHTML = foundContacts;
};

/*
   Функція видалення запису в телефонній книзі.
*/
phoneBook.remove = function (query) {
  var count = 0;
  for (var i = 0; i < contacts.length; i++) {
  	if (contacts[i].contactName == query) {
  		contacts.splice(i, 1); 
  		i = i - 1;
  	    count++;
  	     }	
  }
  if (count > 0)
  	 alert("Вилучений " + count + " контакт")
  phoneBook.showTable();
};

/*
   Функція виведення всіх телефонів.
*/
phoneBook.showTable = function () {
    var table = document.getElementById("myTable");
    while(table.rows.length > 0) {
    	table.deleteRow(0);
    }
    // for (var j = 0; 0 < table.rows.length; j++) {
    // 	table.deleteRow(j);
    // }
    for (var i = 0; i < contacts.length; i++) {
	    var row = table.insertRow(i);
	    var cell1 = row.insertCell(0);
	    var cell2 = row.insertCell(1);
	    var cell3 = row.insertCell(2);
	    cell1.innerHTML = contacts[i].contactName;
	    cell2.innerHTML = contacts[i].contactPhone;
	    cell3.innerHTML = contacts[i].contactEmail;
  }
};