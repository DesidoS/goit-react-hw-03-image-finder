import { ButtonMore } from './Button.styled';
import PropTypes from 'prop-types';

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
