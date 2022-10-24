import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Gallery, GalleryItem } from './Gallery.styled';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    content: [],
  };

  componentDidMount(prevProps, prevState) {
    if (this.props !== this.state) {
      this.setState({
        content: [...this.props.content],
      });
    }
  }

  render() {
    const { content } = this.state;
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
  }
}

export default ImageGallery;
