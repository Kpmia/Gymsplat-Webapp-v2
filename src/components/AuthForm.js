import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import firebase from 'firebase'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class AuthForm extends React.Component {

  constructor() {
    super();
    this.state={
      email: '',
      password: '',
      authstate: false
    }
  }
  
  get isLogin() {
    console.log(this.props.authState)
    return this.props.authState === this.state.authstate;
  }

  // get isSignup() {
  //   return this.props.authState === STATE_SIGNUP;
  // }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };


  handleChangeEmail = event => {
    this.setState({ email : event.target.value })
  }

  handleChangePassword = event => {
    console.log('password')

    this.setState({ password : event.target.value })
  }

  handleLoginFlow = event => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then( event => {
        cookies.set('userIdManager', event.user.uid, {path:  '/' })
        this.setState({ authstate : true })
         alert('Success! Now logging in...')
      }) .catch(err => {
          this.setState({ authstate : false})
          alert('Incorrect password or username.')
      }
      )
  }

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const { authState } = this.state.authstate

    const {
      showLogo,
      onLogoClick,
    } = this.props;

    return (
      <Form>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        <FormGroup>
        <label>Last Name</label>
          <Input onChange={this.handleChangeEmail} placeholder="Enter your email address"/>
        </FormGroup>
        <FormGroup>
          <Label></Label>
          <Input type="password" onChange={this.handleChangePassword} placeholder="Enter your password"/>
        </FormGroup>
        { this.state.authstate ?  <Redirect to='/dashboard' /> : null}
        <hr />
        <Button
          size="lg"
          style={{'color': 'white'}}
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleLoginFlow}>
          Login
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : null }
          </h6>
        </div>

      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN'
export const STATE_SIGNUP = 'SIGNUP';

// AuthForm.propTypes = {
//   authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
//   showLogo: PropTypes.bool,
//   usernameLabel: PropTypes.string,
//   usernameInputProps: PropTypes.object,
//   passwordLabel: PropTypes.string,
//   passwordInputProps: PropTypes.object,
//   confirmPasswordLabel: PropTypes.string,
//   confirmPasswordInputProps: PropTypes.object,
//   onLogoClick: PropTypes.func,
// };

AuthForm.defaultProps = {
  // authState: 'LOGIN',
  showLogo: true,
  // usernameLabel: 'Email',
  // usernameInputProps: {
  //   type: 'email',
  //   placeholder: 'your@email.com',
  // },
  // passwordLabel: 'Password',
  // passwordInputProps: {
  //   type: 'password',
  //   placeholder: 'your password',
  // },
  // confirmPasswordLabel: 'Confirm Password',
  // confirmPasswordInputProps: {
  //   type: 'password',
  //   placeholder: 'confirm your password',
  // },
  onLogoClick: () => {},
};

export default AuthForm;
