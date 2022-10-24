import { GalleryItemImg } from '../Gallery.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  return (
    <>
      <GalleryItemImg src={webformatURL} srcSet={largeImageURL} />
    </>
  );
};

export default ImageGalleryItem;
