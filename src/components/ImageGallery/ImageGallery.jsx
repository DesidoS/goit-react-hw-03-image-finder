import { Component } from 'react';
import { nanoid } from 'nanoid';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { Gallery, GalleryItem } from './Gallery.styled';
import fetchPixabay from '../../api/index';

import Button from '../Button';
import Loader from '../Loader';

class ImageGallery extends Component {
  state = {
    findImg: null,
    content: [],
    status: 'idle',
    page: 1,
    showModal: false,
    bigPic: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page > 0 && prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      fetchPixabay(this.state.findImg, this.state.page).then(
        ({ data: { hits } }) => {
          if (hits.length !== 0) {
            this.setState({
              content: [...this.state.content, ...hits],
              status: 'resolved',
            });
          }
        }
      );
    }
    //
    if (prevProps !== this.props) {
      this.setState({
        findImg: this.props.findImg,
        content: [],
      });
      this.setState({ status: 'pending' });
      fetchPixabay(this.props.findImg, this.props.page).then(
        ({ data: { hits } }) => {
          if (hits.length !== 0) {
            this.setState({
              content: [...this.state.content, ...hits],
              status: 'resolved',
            });
          }
          if (hits.length <= 12) {
            this.setState({
              page: 0,
            });
          }
          if (hits.length <= 0) {
            this.setState({ status: 'empty' });
          }
        }
      );
    }
  }

  componentDidMount() {
    document.addEventListener('click', e => {
      if (e.target.nodeName !== 'IMG') {
        this.setState({ showModal: false });
        return;
      }
      if (!e.target.srcset) {
        return;
      }
      if (e.target.srcset) {
        this.onClickPic(e.target.srcset);
      }
    });
  }

  onLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };
  onClickPic = srcSet => {
    this.setState({
      bigPic: srcSet,
    });
  };

  toggleModal = e => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    const { status, content } = this.state;

    if (status === 'idle') {
      return <h1>Insert your reqvest.</h1>;
    }
    if (status === 'empty') {
      return <h1>🐷</h1>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <>
          <Gallery>
            {content &&
              content.map(({ webformatURL, largeImageURL, tags }) => (
                <GalleryItem key={nanoid()}>
                  <ImageGalleryItem
                    bigPic={this.state.bigPic}
                    largeImageURL={largeImageURL}
                    tags={tags}
                    webformatURL={webformatURL}
                    toggleModal={this.toggleModal}
                    showModal={this.state.showModal}
                  />
                  <p>{tags}</p>
                </GalleryItem>
              ))}
          </Gallery>
          {!this.state.page < 1 && <Button onLoadMore={this.onLoadMore} />}
        </>
      );
    }
  }
}

export default ImageGallery;
