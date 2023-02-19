import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    user: {},
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getUser().then((result) => this.setState({
        user: result,
        loading: false,
      }));
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        Profile
        {loading ? <Loading />
          : (
            <>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.description}</div>
              <img data-testid="profile-image" alt="user" src={ user.image } />
              <Link to="/profile/edit">Editar perfil</Link>
            </>)}
      </div>
    );
  }
}

export default Profile;
