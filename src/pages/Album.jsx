import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    collectionName: '',
    artistName: '',
    songs: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    getMusics(id).then((result) => this.setState({
      collectionName: result[0].collectionName,
      artistName: result[0].artistName,
      songs: result.filter((song) => song.kind === 'song'),
    }));
  }

  render() {
    const { songs, collectionName, artistName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{collectionName}</h2>
        <h3 data-testid="artist-name">{artistName}</h3>
        <ul>
          {songs.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
            />
          ))}
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,

};

export default Album;
