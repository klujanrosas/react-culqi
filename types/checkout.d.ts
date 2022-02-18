declare type CulqiSettings = {
  title: string;
  amount: string;
  currency: string;
  description: string;
  order?: string;
};

declare class CulqiCheckout {
  state: {
    amount: string;
  };
  getCulqiSettings: () => CulqiSettings;
  componentDidMount(): void;
  culqiScript: HTMLScriptElement;
  componentDidUpdate(prevProps: any, prevState: any): void;
  componentWillUnmount(): void;
  initCulqi: () => void;
  onCulqiLoad: (e: any) => void;
  onCulqiEvent: (messageEvent: any) => void;
  openCulqi: () => void;
  setCulqiOptions: (userOptions: any) => void;
  setCulqiSettings: (settings: any) => void;
  setAmount: (amount: string) => void;
  render(): any;
}

export default CulqiCheckout;
