import React, { PropTypes, Component } from 'react';

class GoogleLogin extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    offline: PropTypes.bool,
    scope: PropTypes.string,
    cssClass: PropTypes.string,
    redirectUri: PropTypes.string,
    cookiePolicy: PropTypes.string
  };

  static defaultProps = {
    buttonText: 'Login with Google',
    scope: 'profile email',
    redirectUri: 'postmessage',
    cookiePolicy: 'single_host_origin'
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (function(d, s, id, cb) {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = '//apis.google.com/js/platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    }(document, 'script', 'google-login', () => {
      const params = {
        client_id: this.props.clientId,
        cookiepolicy: this.props.cookiePolicy
      };
      window.gapi.load('auth2', () => {
        gapi.auth2.init(params);
      });
    }));
  }

  onBtnClick() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    const {
      offline, scope, redirectUri, callback
    } = this.props;
    if (offline) {
      let options = {
        'scope': scope,
        'redirect_uri': redirectUri
      };
      auth2.grantOfflineAccess(options)
        .then((data) => {
          callback(data);
        });
    } else {
      let options = {
        'scope': scope
      };
      auth2.signIn(options)
        .then((response) => {
          callback(response);
        });
    }
  }

  render() {
    let style = {
      display: 'inline-block',
      background: '#d14836',
      color: '#fff',
      width: 190,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 2,
      border: '1px solid transparent',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Roboto'
    };
    const {
      cssClass, buttonText
    } = this.props;
    return (
      <div>
        <button
          className={cssClass}
          onClick={this.onBtnClick.bind(this)}
          style={cssClass ? {} : style}
        >
        <span className={'fa fa-google'}></span>
          {buttonText}
        </button>
    </div>
    );
  }
}

export default GoogleLogin;
