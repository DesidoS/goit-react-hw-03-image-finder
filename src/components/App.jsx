import React, { Component } from 'react';
import { Container } from './App.styled';
import SearchBar from './Searchbar';
import Loader from './Loader';
import fetchPixabay from '../api/index';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

class App extends Component {
  state = {
    page: 1,
    findImg: '',
    content: [],
    empty: false,
    isLoading: false,
    showModal: false,
    loadedAllPages: false,
  };

  componentDidMount() {
    document.addEventListener('click', e => {
      if (!e.target.srcset) {
        return;
      }
      if (e.target.nodeName === 'IMG') {
        this.setState({
          showModal: true,
          bigPic: e.target.srcset,
          tags: e.target.tags,
        });
        return;
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.findImg !== this.state.findImg) {
      this.loadingContent(this.state.findImg, this.state.page);
    }
  }

  updateState = findImg => {
    this.setState({ findImg, page: 1, content: [], empty: false });
  };

  loadingContent = async (q, page) => {
    this.setState({ isLoading: true });
    const response = await fetchPixabay(q, page);
    const { totalHits, hits } = response.data;
    const { content } = this.state;

    if (totalHits === 0) {
      this.setState({
        empty: true,
        isLoading: false,
      });
      return;
    }
    if (totalHits <= 12) {
      this.setState({
        loadedAllPages: true,
        isLoading: false,
        content: [...content, ...hits],
      });
      return;
    }
    this.setState({
      isLoading: false,
      content: [...content, ...hits],
      loadedAllPages: false,
      page: page + 1,
    });
    if (totalHits < content.length + 12) {
      this.setState({
        loadedAllPages: true,
      });
      return;
    }
  };

  onLoadMore = () => {
    this.loadingContent(this.state.findImg, this.state.page);
  };

  toggleModal = e => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    const { content, showModal, bigPic, tags } = this.state;

    return (
      <>
        <SearchBar updateState={this.updateState} />
        {this.state.findImg === '' && (
          <Container>
            <h1>Insert your request.</h1>
          </Container>
        )}
        {this.state.empty && (
          <Container>
            <h1>No images for this request.</h1>
          </Container>
        )}

        <ImageGallery content={content} />
        {this.state.content.length > 0 &&
          !this.state.loadedAllPages &&
          !this.state.isLoading && <Button onLoadMore={this.onLoadMore} />}
        {this.state.isLoading && (
          <Container>
            <Loader />
          </Container>
        )}
        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            {<img src={bigPic} alt={tags}></img>}
          </Modal>
        )}
      </>
    );
  }
}

export default App;
