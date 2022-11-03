import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  toggleSong = (trackId, callback) => {
    this.setState({ loading: true }, () => {
      callback(trackId).then(() => this.setState({
        loading: false,
      }));
    });
  };

  favoriteToggle = ({ target }) => {
    const { trackId } = this.props;
    return (target.checked
      ? this.toggleSong(trackId, addSong) : this.toggleSong(trackId, removeSong));
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
    return (
      <li key={ trackId }>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.favoriteToggle }
          />
        </label>
        {loading ? <Loading /> : null}
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
