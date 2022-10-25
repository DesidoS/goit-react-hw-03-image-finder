import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';

class Searchbar extends Component {
  static propTypes = {
    updateState: PropTypes.func.isRequired,
  };

  state = {
    find: '',
    prevFind: '',
  };
  onInputChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  onSubmit = e => {
    e.preventDefault();

    this.setState(() => ({
      prevFind: this.state.find,
    }));

    if (this.state.find.trim('') === '') {
      alert('Please, enter field');
      return;
    }
    if (this.state.find.trim('') === this.state.prevFind) {
      alert('Please, new request');
      return;
    }
    this.props.updateState(this.state.find);
    this.resetFieldts();
  };

  resetFieldts = () => {
    this.setState(() => ({
      find: '',
    }));
  };
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
            name="find"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.find}
            onChange={this.onInputChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

export default Searchbar;
