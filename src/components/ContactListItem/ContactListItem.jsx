import PropTypes from 'prop-types';
import { Item, Phone, DeleteBtn } from './styled';

export const ContactListItem = ({name, number, onDelete }) => {
  return (
    <Item>
      {name}:{' '}
      {number ? <Phone href={'tel:' + number}>{number}</Phone> : 'not set'}
      <DeleteBtn type="button" onClick={onDelete}>
        Del
      </DeleteBtn>
    </Item>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};
