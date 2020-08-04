import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h4`
  font-size: 20px;
  font-weight: 600;
`;
const PayOn = styled.p``;

const CoinExchange = ({ name, fiats }) => {
  return (
    <Container>
      <Title>{name}</Title>
      <PayOn>Pay On {fiats.map((f) => `${f.symbol} `)}</PayOn>
    </Container>
  );
};

CoinExchange.propTypes = {
  name: PropTypes.string.isRequired,
  fiats: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
    })
  ),
};

export default CoinExchange;
