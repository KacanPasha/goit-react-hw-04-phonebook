import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '+380(11) 111-11-11' },
    { id: 'id-2', name: 'Hermione Kline', number: '+380(12) 345-67-89' },
    { id: 'id-3', name: 'Eden Clements', number: '+380(33) 333-33-33' },
    { id: 'id-4', name: 'Annie Copeland', number: '+380(77) 777-77-77' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contact-list');
    console.log(savedContacts);
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contact-list', JSON.stringify(contacts));
    console.log(JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const { name, number } = newContact;
    const contactExists = contacts.some(
      contact => contact.name === name || contact.number === number
    );

    if (contactExists) {
      alert(`${name} or ${number} already exists`);
    } else {
      setContacts(prevContacts => [
        ...prevContacts,
        { ...newContact, id: nanoid() },
      ]);
    }
  };

  const handleSearch = evt => {
    setFilter(evt.target.value);
  };

  const getVisibleCards = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts => 
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const visibleCards = getVisibleCards();

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
