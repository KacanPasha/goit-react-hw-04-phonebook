import React, { Component } from 'react';

export class App extends Component {
  componentDidMount() {
    const savedContacts = localStorage.getItem('contact-list');
    if (savedContacts !== null) {
      console.log(savedContacts);
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.length) {
      localStorage.setItem('contact-list', JSON.stringify(this.state.contacts));
    }
  }
}
[
    { id: 'id-1', name: 'Rosie Simpson', number: '+380(11) 111-11-11' },
    { id: 'id-2', name: 'Hermione Kline', number: '+380(12) 345-67-89' },
    { id: 'id-3', name: 'Eden Clements', number: '+380(33) 333-33-33' },
    { id: 'id-4', name: 'Annie Copeland', number: '+380(77) 777-77-77' },
  ]