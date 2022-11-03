import React, { Component } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';

class Search extends Component {
  state = {
    artist: '',
    isButtonDisabled: true,
    loading: false,
  };

  handleChange = ({ target }) => {
    const minLength = 2;
    this.setState({
      artist: target.value,
      isButtonDisabled: target.value.length < minLength,
    });
  };

  render() {
    const { artist, isButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : null}
        <form action="">
          <input
            type="text"
            name=""
            id=""
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ artist }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar

          </button>
        </form>

        Search
      </div>
    );
  }
}

export default Search;
