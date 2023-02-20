import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
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

  updateProfile = (e) => {
    e.preventDefault();
    const { image, name, email, description } = e.target.elements;
    const user = {
      image: image.value,
      name: name.value,
      email: email.value,
      description: description.value,
    };
    this.setState({ loading: true }, () => {
      updateUser(user).then(() => this.setState({
        loading: false,
        redirect: true,
      }));
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  render() {
    const { loading, user, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/profile" />;
    }

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading />
          : (

            <form onSubmit={ this.updateProfile }>
              <div>
                <img
                  src={ user.image || '/standard-profile.svg' }
                  alt="Foto de perfil"
                  data-testid="profile-image"
                />
                <label htmlFor="profile-image">
                  <input
                    type="text"
                    name="image"
                    value={ user.image }
                    id="profile-image"
                    placeholder="Digite uma URL"
                    onChange={ this.handleChange }
                    data-testid="edit-input-image"
                  />
                </label>
              </div>
              <div>
                <h3>Nome</h3>
                <label htmlFor="profile-name">
                  <input
                    type="text"
                    name="name"
                    value={ user.name }
                    id="profile-name"
                    placeholder="Digite seu nome"
                    onChange={ this.handleChange }
                    data-testid="edit-input-name"
                  />
                </label>
              </div>
              <div>
                <h3>E-mail</h3>
                <label htmlFor="profile-email">
                  <input
                    type="email"
                    name="email"
                    value={ user.email }
                    id="profile-email"
                    placeholder="usuario@usuario.com.br"
                    onChange={ this.handleChange }
                    data-testid="edit-input-email"
                  />
                </label>
              </div>
              <div>
                <h3>Descrição</h3>
                <label htmlFor="profile-description">
                  <textarea
                    name="description"
                    value={ user.description }
                    id="profile-description"
                    placeholder="Sobre mim"
                    onChange={ this.handleChange }
                    data-testid="edit-input-description"
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={ !(user.name && user.email && user.description && user.image) }
                data-testid="edit-button-save"
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
