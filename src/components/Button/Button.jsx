import PropTypes from 'prop-types';
import { ButtonMore } from './Button.styled';

export default function Button({ onLoadMore }) {
  return (
    <ButtonMore type="button" onClick={onLoadMore}>
      Load more
    </ButtonMore>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
