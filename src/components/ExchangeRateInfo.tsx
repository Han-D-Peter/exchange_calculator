import React from 'react';

type ExchangeRateProps = {
  exchangeRateAmount: string;
  receivingCountry: string;
  sendingCountry: string;
};

function ExchangeRateInfo({
  exchangeRateAmount,
  receivingCountry,
  sendingCountry,
}: ExchangeRateProps) {
  return (
    <div>
      <span>환율:</span>
      <span>{`${exchangeRateAmount}`}</span>
      <span data-cy="exchangeUnit">{`${receivingCountry}/${sendingCountry}`}</span>
    </div>
  );
}

export default ExchangeRateInfo;
