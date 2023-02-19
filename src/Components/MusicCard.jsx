import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    const { trackId } = this.props;
    this.setState({ loading: true }, () => {
      getFavoriteSongs().then((result) => this.setState({
        checked: result.some((favorite) => favorite.trackId === trackId),
        loading: false,
      }));
    });
  }

  toggleSong = (trackId, callback, checked) => {
    this.setState({ loading: true }, () => {
      callback(trackId).then(() => this.setState({
        loading: false,
        checked,
      }));
    });
  };

  favoriteToggle = ({ target }) => {
    const { trackId, trackName, previewUrl, toggleShowHide } = this.props;
    const songObject = {
      trackId,
      trackName,
      previewUrl,
    };
    toggleShowHide();
    return (target.checked
      ? this.toggleSong(songObject, addSong, true)
      : this.toggleSong(songObject, removeSong, false));
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <li key={ trackId }>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.favoriteToggle }
            checked={ checked }
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
  toggleShowHide: PropTypes.func,
};

MusicCard.defaultProps = {
  toggleShowHide: () => {},
};

export default MusicCard;
