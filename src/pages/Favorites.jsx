import React, { Component } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    loading: false,
    test: false,
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getFavoriteSongs().then((result) => this.setState({
        favoriteSongs: result,
        loading: false,
      }));
    });
  }

  componentDidUpdate() {
    this.setState(() => {
      getFavoriteSongs().then((result) => this.setState({
        favoriteSongs: result,
      }));
    });
  }

  toggleShowHide = () => {
    this.setState((state) => ({ test: !state.test }));
  };

  render() {
    const { favoriteSongs, loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        {loading ? <Loading /> : null}
        {!loading && favoriteSongs.map((song) => (
          <MusicCard
            key={ song.trackId }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            trackId={ song.trackId }
            toggleShowHide={ this.toggleShowHide }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
