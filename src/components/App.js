import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useEffect } from 'react';

const contactsLocalStorage = () => {

  const savedContacts = localStorage.getItem('contact-list');
  if (savedContacts !== null) {
    return JSON.parse(savedContacts) ;
  }
  return [
    { id: 'id-1', name: 'Rosie Simpson', number: '+380(11) 111-11-11' },
    { id: 'id-2', name: 'Hermione Kline', number: '+380(12) 345-67-89' },
    { id: 'id-3', name: 'Eden Clements', number: '+380(33) 333-33-33' },
    { id: 'id-4', name: 'Annie Copeland', number: '+380(77) 777-77-77' },
  ]
}

export const App = () => {
  const [contacts, setContacts] = useState(contactsLocalStorage);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact-list', JSON.stringify(contacts));
  }, [contacts]);


  const addContact = newContact => {
    const { name, number } = newContact;
    const contactExists = contacts.some(
      contact => contact.name === name || contact.number === number
    );

    if (contactExists) {
      alert(`${name} or ${number} already exists`);
    } else {
      setContacts(prevState => [...prevState, { ...newContact, id: nanoid() }]);
    }
  };
  const handleSearch = evt => {
    const newFilter = evt.target.value;
    setFilter(newFilter);
  };
  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const visibleCards = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      React homework template
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAdd={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleSearch={handleSearch} />
        <ContactList contacts={visibleCards} onDeleteContact={deleteContact} />
      </div>
    </div>
  );
};
