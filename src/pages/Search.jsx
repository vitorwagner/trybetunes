import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artist: '',
    isButtonDisabled: true,
    loading: false,
    response: [],
    responseName: '',
  };

  handleChange = ({ target }) => {
    const minLength = 2;
    this.setState({
      artist: target.value,
      isButtonDisabled: target.value.length < minLength,
    });
  };

  handleSubmit = (e) => {
    const { artist } = this.state;
    e.preventDefault();
    this.setState({ loading: true }, () => {
      searchAlbumsAPI(artist).then((result) => this.setState({
        responseName: artist,
        artist: '',
        loading: false,
        response: result,
      }));
    });
  };

  render() {
    const { artist, isButtonDisabled, loading, response, responseName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.handleSubmit }>
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

        {(!loading && responseName && response.length === 0) && (
          <div>
            <p>Nenhum álbum foi encontrado</p>
          </div>
        )}

        {(response.length > 0) && <p>{`Resultado de álbuns de: ${responseName}`}</p>}
        {loading ? <Loading /> : (response.map((album) => (
          <div key={ album.collectionId }>
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              Link
            </Link>
            <img src={ album.artworkUrl100 } alt={ album.title } />
            <h2>{album.artistName}</h2>
            <h3>{album.collectionName}</h3>
          </div>
        )))}
      </div>
    );
  }
}

export default Search;
