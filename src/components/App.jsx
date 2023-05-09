// ************************************************************
// * 2 - Книга контактів
// * Напиши застосунок зберігання контактів телефонної книги
// * Достатньо виділити чотири компоненти:
// *  форма додавання контактів, список контактів, елемент списку контактів та фільтр пошуку.

// *** HW3
// * Візьми своє рішення завдання з попередньої домашньої роботи і додай зберігання контактів
// * телефонної книги в localStorage.Використовуй методи життєвого циклу.
// *    - Під час додавання та видалення контакту контакти зберігаються у локальне сховище.
// *    - Під час завантаження контакти зчитуються з локального сховища і записуються у стан.

import React, { Component, Fragment } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { Header } from 'common/styledCommon';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  clearFilter = () => this.setState({ filter: '' });

  visibleContacts = () => {
    const { contacts, filter } = this.state;
    if (!filter) return contacts;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  addContact = newContact => {
    if (
      this.state.contacts.find(
        contact =>
          contact.name.toLocaleLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      window.alert(`Error! ${newContact.name} is already in the contacts`);
      this.setState({ filter: newContact.name.toLowerCase() });
      return false;
    }

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));

    this.clearFilter();
    return true;
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = ({ target: { value } }) => {
    this.setState({ filter: value.toLowerCase() });
  };

  componentDidMount() {
    //HW3 - Під час завантаження контакти зчитуються з локального сховища і записуються у стан.
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevState) {
    //HW3  - Під час додавання та видалення контакту контакти зберігаються у локальне сховище.
    const { contacts } = this.state;
    const { contacts: prevContacts } = prevState;

    if (contacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  render() {
    const {
      visibleContacts,
      handleFilterChange,
      addContact,
      deleteContact,
      state: { filter },
    } = this;

    return (
      <Fragment>
        <Header>Phonebook</Header>
        <ContactForm addContact={addContact} />
        <Header as="h2">Contacts</Header>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={visibleContacts()}
          deleteContact={deleteContact}
        />
      </Fragment>
    );
  }
}

export default App;

/*
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
       */
