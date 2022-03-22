import React from 'react';

type ResultViewProps = {
  resultValue: string;
  resultCountry: string;
};

function ResultView({ resultValue, resultCountry }: ResultViewProps) {
  return <div>{`수취금액은 ${resultValue} ${resultCountry} 입니다.`}</div>;
}

export default ResultView;
