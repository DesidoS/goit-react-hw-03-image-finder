import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { Container } from './App.styled';

class App extends Component {
  state = {
    findImg: null,
    showModal: false,
  };

  updateState = findImg => {
    this.setState({ findImg });
  };

  render() {
    return (
      <Container>
        <Searchbar updateState={this.updateState} />
        <ImageGallery findImg={this.state.findImg} />
      </Container>
    );
  }
}

export default App;
