import { nanoid } from 'nanoid';
import { Gallery, GalleryItem } from './Gallery.styled';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ content }) => {
  return (
    <>
      <Gallery>
        {content.map(({ webformatURL, largeImageURL, tags }) => (
          <GalleryItem key={nanoid()}>
            <ImageGalleryItem
              largeImageURL={largeImageURL}
              tags={tags}
              webformatURL={webformatURL}
            />
            <p>{tags}</p>
          </GalleryItem>
        ))}
      </Gallery>
    </>
  );
};

export default ImageGallery;

ImageGalleryItem.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
