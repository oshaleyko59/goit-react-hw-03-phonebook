// ************************************************************
// * - Додай поле пошуку для фільтрації списку контактів за ім'ям.
// * це інпут без форми, значення якого записується у стан (контрольований елемент)
// * Логіка фільтрації повинна бути нечутливою до регістру

import PropTypes from 'prop-types';
import { Label } from 'common/styledCommon';
import { SearchInput } from './styled';

export const Filter = ({ value, onChange}) => {
  return (
    <Label>
      <SearchInput
        type="text"
        id="filter"
        name="filter"
        value={value}
        onChange={onChange}
        placeholder="Type in your search pattern here"
      />
    </Label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
