'use strict';

// מערך המכיל את כל אנשי הקשר
let contacts = [
  {
    name: "Ben",
    image: "images/men.jpg",
    age: '25',
    telephone: '050-5558555',
    address: 'Tel Aviv'
  },
  {
    name: "Alice",
    image: "images/woman1.jpg",
    age: '23',
    telephone: '050-5555555',
    address: 'Tel Aviv'
  },

  {
    name: "Melisa",
    image: "images/woman2.jpg",
    age: '28',
    telephone: '050-5559555',
    address: 'Tel Aviv'
  }
];

// יצירת שמות משתנים
const contacts_list = document.getElementById("Contacts_list");
const add_new_contact_popup = document.getElementById("add-new-contact");
const save_btn = document.getElementById("save_btn");
const contact_popup = document.getElementById('contact-popup');
const contact_popup_close_btn = document.getElementById('contact-popup-close');
const add_new_person_close_btn = document.getElementById('add-person-close');
const delete_all_btn = document.getElementById('delete-all');

let editIndex = null;

// פונקציה שמציגה את רשימת אנשי הקשר בדף
function displayContacts(contactsArray) {
  contacts_list.innerHTML = '';
  contactsArray.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  contactsArray.forEach((element, index) => {
    const li = document.createElement('li');

    const image = document.createElement('img');
    image.setAttribute('src', element.image);
    image.alt = element.name + " photo ";

    li.textContent = `${element.name} ${element.telephone}`;
    li.prepend(image);

    const delete_btn = document.createElement('button');
    delete_btn.className = "contact-delete-btn button";
    delete_btn.textContent = "Delete";
    li.appendChild(delete_btn);

    const edit_btn = document.createElement('button');
    edit_btn.className = "contact-edit-btn button";
    edit_btn.textContent = "Edit";
    li.appendChild(edit_btn);

    const info_btn = document.createElement('button');
    info_btn.className = "contact-details-btn button";
    info_btn.textContent = "Show contact info";
    li.appendChild(info_btn);

    //פופאפ הצגת פרטי איש קשר
    info_btn.addEventListener('click', () => {
      const modal_content = contact_popup.querySelector('.modal-content');
      const details = modal_content.querySelectorAll('p');

      details[0].textContent = `Name: ${element.name}`;
      details[2].textContent = ((element.age != '') ? `Age: ${element.age}` : '');
      details[1].textContent = `Telephone: ${element.telephone}`;
      details[3].textContent = (element.address != '') ? `Address: ${element.address}` : '';

      contact_popup.style.display = 'flex';
    });

    //הוספת hover לשורה של איש הקשר
    li.addEventListener('mouseover', () => {
      li.style.backgroundColor = '#d6cfc5';
    });

    li.addEventListener('mouseout', () => {
      li.style.backgroundColor = '';
    });

    contacts_list.appendChild(li);
  });
}

displayContacts(contacts);

// סגירת חלון הצגת פרטי איש קשר
contact_popup_close_btn.addEventListener('click', () => {
  contact_popup.style.display = 'none';
});

//מחיקת כל רשומות אנשי הקשר
if (delete_all_btn) {
  delete_all_btn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all contacts?")) {
      contacts = [];
      displayContacts(contacts);
    }
  });
}