import PropTypes from 'prop-types';
import { ContactListItem } from 'components/ContactListItem';
import { List } from './styled';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          name={name}
          number={number}
          onDelete={() => deleteContact(id)}
        ></ContactListItem>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      number: PropTypes.string,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired
};


