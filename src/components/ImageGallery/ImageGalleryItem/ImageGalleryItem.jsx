import { GalleryItemImg } from '../Gallery.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  return (
    <>
      <GalleryItemImg src={webformatURL} srcSet={largeImageURL} />
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
