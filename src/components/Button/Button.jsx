import { ButtonMore } from './Button.styled';

export default function Button({ onLoadMore }) {
  return (
    <ButtonMore type="button" onClick={onLoadMore}>
      Load more
    </ButtonMore>
  );
}
