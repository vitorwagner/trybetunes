import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    name: '',
    isButtonDisabled: true,
    loading: false,
  };

  handleChange = ({ target }) => {
    const minLength = 3;
    this.setState({
      name: target.value,
      isButtonDisabled: target.value.length < minLength,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true }, async () => {
      await createUser({ name });
      history.push('/search');
    });
  };

  render() {
    const { name, isButtonDisabled, loading } = this.state;

    return (
      <div data-testid="page-login">
        {loading ? <Loading /> : null}
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            data-testid="login-name-input"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// propTypes ref: https://stackoverflow.com/questions/52109592/react-router-the-prop-history-is-undefined

export default Login;
