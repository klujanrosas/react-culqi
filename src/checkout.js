import { Component, createElement } from 'react';
import { Provider } from './context';

const culqiMessages = {
  welcome: 'checkout_bienvenido',
  closed: 'checkout_cerrado',
};

const baseCulqiUrl = 'https://checkout.culqi.com';
const culqiId = 'culqi-js';
const culqiUrl = `${baseCulqiUrl}/js/v3`;

class CulqiCheckout extends Component {
  state = {
    amount: this.props.amount || 0,
  };

  getCulqiSettings = () => {
    const { amount } = this.state;
    const { currency = 'PEN', description = '', title = '' } = this.props;

    return {
      amount,
      currency,
      description,
      title,
    };
  };

  componentDidMount() {
    const script = document.createElement('script');

    script.id = culqiId;
    script.src = culqiUrl;
    script.async = true;
    script.onload = this.onCulqiLoad;
    this.culqiScript = script;

    document.body.appendChild(this.culqiScript);

    window.addEventListener('message', this.onCulqiEvent, false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.amount !== this.state.amount) {
      this.setCulqiSettings(this.getCulqiSettings());
    }
  }

  componentWillUnmount() {
    if (this.culqiScript) {
      this.culqiScript.parentNode.removeChild(this.culqiScript);
    }

    window.removeEventListener('message', this.onCulqiEvent, false);
  }

  initCulqi = () => {
    const { publicKey, options = {} } = this.props;
    const culqiSettings = this.getCulqiSettings();

    this.setCulqiOptions(options);
    window.Culqi.publicKey = publicKey;
    requestAnimationFrame(() => {
      this.setCulqiSettings(culqiSettings);
    });
  };

  onCulqiLoad = e => {
    if (window.Culqi) {
      this.initCulqi();
    }
  };

  onCulqiEvent = messageEvent => {
    const { origin, data } = messageEvent;
    const { onClose, onError, onToken } = this.props;

    if (origin !== baseCulqiUrl) return;

    if (typeof data === 'string' && data === culqiMessages.closed) {
      onClose && onClose();

      this.initCulqi();
    }

    if (typeof data === 'object') {
      const { object } = data;

      if (!object) return;

      if (object === 'token') {
        this.setState({ token: data }, () => {
          onToken && onToken(data);
        });
      } else if (object === 'error') {
        this.setState({ error: data }, () => {
          onError && onError(data);
        });
      }
    }
  };

  openCulqi = () => {
    if (window.Culqi) {
      window.Culqi.open();
    }
  };

  setCulqiOptions = userOptions => {
    if (Object.keys(userOptions).length > 0 && window.Culqi) {
      window.Culqi.options(userOptions);
    }
  };

  setCulqiSettings = settings => {
    if (window.Culqi) {
      window.Culqi.settings(settings);
    }
  };

  setAmount = amount => {
    this.setState({ amount: amount || 0 });
  };

  getCulqiProps = () => {
    return {
      openCulqi: this.openCulqi,
      setAmount: this.setAmount,
      amount: this.state.amount,
      token: this.state.token,
      error: this.state.error,
    };
  };

  render() {
    return createElement(Provider, {
      children: this.props.children,
      value: this.getCulqiProps(),
    });
  }
}

export default CulqiCheckout;
