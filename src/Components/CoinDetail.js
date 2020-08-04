import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import CoinExchange from "./CoinExchange";

const Container = styled.div``;
const Title = styled.h1``;
const LinkContainer = styled.ul`
  display: flex;
  width: 20%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Linker = styled.li`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;

  border-radius: 10px;
  color: ${(props) => (props.selected ? "white" : "black")};
  background-color: ${(props) => (props.selected ? "#1d966e" : "white")};
  border: 2px #1d966e solid;
`;

const CoinDetail = withRouter(
  ({
    id,
    name,
    symbol,
    description,
    rank,
    open_source,
    proof_type,
    org_structure,
    location: { pathname },
    is_exchanges,
    is_markets,
    markets,
    exchanges,
  }) => {
    return (
      <Container>
        <Title>
          {name} / {symbol}
        </Title>
        <p>{description}</p>
        <br />
        <p>
          <strong>Rank: </strong>
          {rank}
        </p>
        <p>
          <strong>OpenSource: </strong>
          {open_source ? "true" : "false"}
        </p>
        <p>
          <strong>Proof Type: </strong>
          {proof_type}
        </p>
        <p>
          <strong>Structure: </strong>
          {org_structure}
        </p>
        <LinkContainer>
          <Linker selected={pathname.includes("/exchanges")}>
            <Link to={`/coins/${id}/exchanges`}>Exchanges</Link>
          </Linker>
          <Linker selected={pathname.includes("/markets")}>
            <Link to={`/coins/${id}/markets`}>Markets</Link>
          </Linker>
        </LinkContainer>
        {is_exchanges &&
          exchanges.map((exchange, i) => (
            <CoinExchange key={`coin_exchange_${i}`} {...exchange} />
          ))}
      </Container>
    );
  }
);

CoinDetail.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rank: PropTypes.number,
  open_source: PropTypes.bool.isRequired,
  proof_type: PropTypes.string.isRequired,
  org_structure: PropTypes.string.isRequired,
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

export default CoinDetail;
