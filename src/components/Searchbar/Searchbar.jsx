import { Component } from 'react';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';

class Searchbar extends Component {
  state = {
    findImg: '',
  };
  onInputChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.findImg.trim('') === '') {
      alert('Please, enter field');
      return;
    }
    this.props.updateState(this.state.findImg);
    // this.resetFieldts();
  };

  // resetFieldts = () => {
  //   this.setState(() => ({
  //     findImg: '',
  //   }));
  // };
  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>
              <FcSearch />
            </SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            name="findImg"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.findImg}
            onChange={this.onInputChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

export default Searchbar;
