import { GalleryItemImg } from '../Gallery.styled';
import Modal from '../../Modal';

const ImageGalleryItem = ({
  showModal,
  toggleModal,
  webformatURL,
  largeImageURL,
  tags,
  bigPic,
}) => {
  return (
    <>
      <GalleryItemImg
        onClick={toggleModal}
        src={webformatURL}
        srcSet={largeImageURL}
      />
      {showModal && <Modal onClose={toggleModal} bigPic={bigPic} tags={tags} />}
    </>
  );
};

export default ImageGalleryItem;
