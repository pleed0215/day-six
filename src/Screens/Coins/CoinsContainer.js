import React from "react";
import CoinsPresenter from "./CoinsPresenter";
import {
  getCoins,
  getCoinById,
  getExchangesById,
  getMarketsById,
} from "../../api";

export default class extends React.Component {
  state = {
    loading: true,
    coins: [],
    markets: [],
    exchanges: [],
    coin: null,
    coin_id: null,
    is_exchanges: false,
    is_markets: false,
  };
  getCoins = async () => {
    try {
      const { data: coins } = await getCoins();

      this.setState({
        coins,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  getCoinById = async () => {
    try {
      const {
        match: {
          params: { id: coin_id },
        },
      } = this.props;

      if (coin_id) {
        const { data: coin } = await getCoinById(coin_id);
        this.setState({
          coin,
          coin_id,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  getMarketsById = async () => {
    try {
      const {
        match: {
          params: { id: coin_id },
        },
      } = this.props;

      if (coin_id) {
        const { data: markets } = await getMarketsById(coin_id);
        this.setState({
          markets,
          coin_id,
          is_markets: true,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  getExchangesById = async () => {
    try {
      const {
        match: {
          params: { id: coin_id },
        },
      } = this.props;

      if (coin_id) {
        const { data: exchanges } = await getExchangesById(coin_id);

        this.setState({
          exchanges,
          coin_id,
          is_exchanges: true,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    const {
      match: {
        path,
        params: { id },
      },
    } = this.props;

    if (id) {
      this.getCoinById();
      if (path.includes("/exchanges")) {
        this.getExchangesById();
      } else if (path.includes("/markets")) {
        this.getMarketsById();
      }
      console.log(this.state);
    } else {
      this.getCoins();
    }
  }
  render() {
    return <CoinsPresenter {...this.state} />;
  }
}
