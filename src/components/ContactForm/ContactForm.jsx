import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Label, Input } from 'common/styledCommon';
import { SubmitBtn, Form } from './styled';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func,
  };

  state = {
    ...INITIAL_STATE,
  };

  reset = () => {
    this.setState(INITIAL_STATE);
  };

  onChange = evt => {
    const {
      target: { value, name },
    } = evt;
    this.setState({ [name]: value });
  };

  createContact = () => {
    const name = this.state.name
      .split(' ')
      .filter(word => word !== '')
      .join(' ');

    return {
      id: nanoid(),
      name,
      number: this.state.number,
    };
  };

  onSubmit = evt => {
    evt.preventDefault();
    const {
      createContact, reset,
      props: { addContact },
    } = this;
    if (addContact(createContact())) reset();
  };

  render() {
    const { onSubmit, onChange } = this;

    return (
      <Form onSubmit={onSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onChange}
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onChange}
          />
        </Label>

        <SubmitBtn type="submit">Add</SubmitBtn>
      </Form>
    );
  }
}
