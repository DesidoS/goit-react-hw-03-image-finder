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
    status: 'idle',
    showModal: false,
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
    this.setState({ findImg, page: 1, content: [] });
  };

  loadingContent = async (q, page) => {
    this.setState({ status: 'pending' });
    const response = await fetchPixabay(q, page);
    if (response.data.totalHits <= 12) {
      this.setState({
        content: [...response.data.hits],
        status: 'resolved',
      });
    }
    if (response.data.totalHits === 0) {
      this.setState({
        status: 'empty',
      });
    }
    if (response.data.totalHits > 12) {
      this.setState({
        content: [...this.state.content, ...response.data.hits],
        status: 'resolved',
        page: this.state.page + 1,
      });
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
    const { status, content, showModal, bigPic, tags } = this.state;

    if (status === 'idle') {
      return (
        <>
          <SearchBar updateState={this.updateState} />
          <Container>
            <h1>Insert your request.</h1>
          </Container>
        </>
      );
    }
    if (status === 'pending') {
      return (
        <>
          <SearchBar updateState={this.updateState} />
          <Container>
            <Loader />;
          </Container>
        </>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <SearchBar updateState={this.updateState} />
          <ImageGallery content={content} />
          {this.state.page > 1 && <Button onLoadMore={this.onLoadMore} />}
          {showModal && (
            <Modal toggleModal={this.toggleModal}>
              {<img src={bigPic} alt={tags}></img>}
            </Modal>
          )}
        </>
      );
    }
    if (status === 'empty') {
      return (
        <>
          <SearchBar updateState={this.updateState} />
          <Container>
            <h1>No images for this request.</h1>
          </Container>
        </>
      );
    }
  }
}

export default App;
