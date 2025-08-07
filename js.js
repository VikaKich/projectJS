'use strict';

// An array of all the default contacts (That will show up when first opening the page).
let contacts = [
  {
    name: "Alice Brown",
    image: "images/woman1.jpg",
    age: '23',
    telephone: '050-8655555',
    address: 'Tel Aviv'
  },
  {
    name: "Melisa White",
    image: "images/woman2.jpg",
    age: '28',
    telephone: '050-5559576',
    address: 'Eilat'
  },
  {
    name: "Ben McKnight",
    image: "images/men.jpg",
    age: '25',
    telephone: '050-4858555',
    address: 'Tel Aviv'
  },
  {
    name: "Elliott Smith",
    image: "images/men.jpg",
    age: '29',
    telephone: '050-5549565',
    address: 'Haifa'
  }
];

// Creating the constants.
const contactsList = document.getElementById("Contacts_list");
const addNewContactPopup = document.getElementById("add-new-contact");
const addBtn = document.getElementById("add");
const saveBtn = document.getElementById("save_btn");
const contactPopup = document.getElementById('contact-popup');
const contactPopupCloseBtn = document.getElementById('contact-popup-close');
const addNewPersonCloseBtn = document.getElementById('add-person-close');
const deleteAllBtn = document.getElementById('delete-all');

let editIndex = null;
let currentSearchTerm = '';

createSearchBox();
displayContacts();

// Dynamic search box
function createSearchBox() {
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';

  const searchInput = document.createElement('input');
  searchInput.id = 'search-input';
  searchInput.type = 'text';
  searchInput.placeholder = 'Search by name';

  searchContainer.appendChild(searchInput);

  // Appending before the first button
  const main = document.querySelector('main');
  const firstButton = main.querySelector('button');
  main.insertBefore(searchContainer, firstButton);

  // Adding a listener
  searchInput.addEventListener('input', function (event) {
    searchContacts(event.target.value);
  });
}

// Search function
function searchContacts(searchTerm) {
  currentSearchTerm = searchTerm;
  if (!searchTerm.trim()) {
    displayContacts();
    return;
  }

  const filtered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayContacts(filtered);
}

//Adding a listener to the eddects button.
const effectBtn = document.getElementById('special-effect-btn');
effectBtn.addEventListener('click', function () {
  document.body.classList.toggle('rainbow-effect');
});

function displayEmptyMessage() {
  const emptyMessage = document.createElement('div');
  emptyMessage.className = 'empty-message';
  emptyMessage.textContent = currentSearchTerm ?
    `No contacts found "${currentSearchTerm}"` :
    'There are no contacts in the phone book';
  contactsList.appendChild(emptyMessage);
}

// Display sorted contacts dynamically
function displayContacts(filteredContacts = null) {
  contactsList.innerHTML = '';

  // Sorting by name
  let contactsToShow = filteredContacts || contacts;
  contactsToShow.sort((a, b) => a.name.localeCompare(b.name));

  // Check if the phone book is empty or if there aren't any search results.
  if (contactsToShow.length === 0) {
    displayEmptyMessage();
    return;
  }

  contactsToShow.forEach((element) => {
    const realIndex = contacts.findIndex(contact => contact === element);
    contactsList.appendChild(createContactElement(element, realIndex));
  });
}

//Create a contact hmtl to add to the list
function createContactElement(element, index) {
  const li = document.createElement('li');

  const image = document.createElement('img');
  image.setAttribute('src', element.image);
  image.alt = `${element.name} photo `;
  li.textContent = `${element.name}`;
  li.prepend(image);

  li.appendChild(createButton("contact-delete-btn button", "Delete", index));
  li.appendChild(createButton("contact-edit-btn button", "Edit", index));
  li.appendChild(createButton("contact-details-btn button", "Show contact info", index));

  return li;
}

//Create a button
function createButton(className, text, index) {
  const btn = document.createElement('button');
  btn.className = className;
  btn.textContent = text;
  btn.setAttribute("data-id", index);
  return btn;
}

// Event Delegation - listeners for the contacts' buttons
contactsList.addEventListener('click', function (event) {
  const target = event.target;
  const index = parseInt(target.dataset.id);

  if (target.classList.contains('contact-delete-btn')) {
    // Deleting a contact
    contacts.splice(index, 1);
    displayContacts();
  }

  else if (target.classList.contains('contact-edit-btn')) {
    // Editing a contact
    const element = contacts[index];
    editIndex = index;
    showAddNewContactPopup(element);
  }

  else if (target.classList.contains('contact-details-btn')) {
    // Info popup
    const element = contacts[index];
    showContactInfoPopup(element);
  }
});

function showContactInfoPopup(element) {
  const modal_content = contactPopup.querySelector('.modal-content');

  //Fill the details array with non-empty values only.
  const contacts = [];
  contacts.push(`Name: ${element.name}`);
  contacts.push(`Telephone: ${element.telephone}`);
  if (element.age !== '') {
    contacts.push(`Age: ${element.age}`);
  }
  if (element.address !== '') {
    contacts.push(`Address: ${element.address}`);
  }

  const ContactsInfo = document.createElement('p');
  ContactsInfo.innerHTML = contacts.join('<br>');

  const contactDetailsContainer = modal_content.querySelector('#contact-details');
  contactDetailsContainer.innerHTML = '';

  contactPopup.style.display = 'flex';
  contactDetailsContainer.appendChild(ContactsInfo);
  if (element.image !== '') {
    const image = document.createElement('img');
    image.setAttribute('src', element.image);
    image.alt = element.name + " photo ";
    contactDetailsContainer.append(image);
  }
}

function showAddNewContactPopup(element) {
  document.getElementById('name-field').value = element.name;
  document.getElementById('phone-field').value = element.telephone;
  document.getElementById('address-field').value = element.address;
  document.getElementById('age-field').value = element.age;
  document.getElementById('img-field').value = element.image;

  addNewContactPopup.style.display = 'flex';
}

// Event Delegation for the hover effect on mouseover and mouseout.
contactsList.addEventListener('mouseover', function (event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.add('hovered');
  }
});

contactsList.addEventListener('mouseout', function (event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.remove('hovered');
  }
});

// Check for existing name
function isNameExists(name, excludeIndex = null) {
  return contacts.some((contact, index) =>
    contact.name.toLowerCase() === name.toLowerCase() && index !== excludeIndex
  );
}

// Show contact info close button
contactPopupCloseBtn.addEventListener('click', () => {
  contactPopup.style.display = 'none';
});

// Add a new contact button
addBtn.addEventListener('click', () => {
  editIndex = null;
  document.getElementById('name-field').value = '';
  document.getElementById('phone-field').value = '';
  document.getElementById('address-field').value = '';
  document.getElementById('age-field').value = '';
  document.getElementById('img-field').value = '';
  addNewContactPopup.style.display = 'flex';
});

// Close button for adding a contact.
addNewPersonCloseBtn.addEventListener('click', () => {
  addNewContactPopup.style.display = 'none';
});

// Save button on addition / editing.
saveBtn.addEventListener('click', () => {
  const name = document.getElementById('name-field').value.trim();
  const phone = document.getElementById('phone-field').value.trim();
  const address = document.getElementById('address-field').value.trim();
  const age = document.getElementById('age-field').value.trim();
  const image = document.getElementById('img-field').value.trim();

  if (!name || !phone) {
    alert('Please fill out at least name and phone.');
    return;
  }

  // Check for existing name
  if (isNameExists(name, editIndex)) {
    alert('A contact with this name already exists.');
    return;
  }

  const newContact = { name, telephone: phone, address, age, image };

  if (editIndex !== null) {
    contacts[editIndex] = newContact;
  } else {
    contacts.push(newContact);
  }

  addNewContactPopup.style.display = 'none';
  displayContacts();
});

// Delete all contacts
if (deleteAllBtn) {
  deleteAllBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all contacts?")) {
      contacts = [];
      displayContacts();
    }
  });
}
