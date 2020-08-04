import React from "react";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import Coin from "../../Components/Coin";
import CoinDetail from "../../Components/CoinDetail";

const CoinsPresenter = ({
  loading,
  coins,
  coin_id,
  coin,
  is_exchanges,
  is_markets,
  markets,
  exchanges,
}) =>
  loading ? (
    <Loader />
  ) : coin_id ? (
    coin && (
      <CoinDetail
        {...coin}
        is_exchanges={is_exchanges}
        is_markets={is_markets}
        markets={markets}
        exchanges={exchanges}
      />
    )
  ) : (
    coins
      .filter((coin) => coin.rank !== 0)
      .sort((first, second) => first.rank - second.rank)
      .map((coin) => <Coin key={coin.id} {...coin} />)
  );

CoinsPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  coin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rank: PropTypes.number,
    open_source: PropTypes.bool.isRequired,
    proof_type: PropTypes.string.isRequired,
    org_structure: PropTypes.string.isRequired,
  }),
  is_markets: PropTypes.bool.isRequired,
  is_exchanges: PropTypes.bool.isRequired,
  markets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  exchanges: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      fiats: PropTypes.arrayOf(
        PropTypes.shape({
          symbol: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};

export default CoinsPresenter;
