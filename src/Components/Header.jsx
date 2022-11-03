import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    name: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true }, () => {
      getUser().then((result) => this.setState({
        name: result.name,
        loading: false,
      }));
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : <h1 data-testid="header-user-name">{name}</h1>}
        <nav>
          <ul>
            <li><Link data-testid="link-to-search" to="/search">Search</Link></li>
            <li>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favorites
              </Link>
            </li>
            <li><Link data-testid="link-to-profile" to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
