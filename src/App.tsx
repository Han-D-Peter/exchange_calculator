import getExchangeRate from 'api';
import AmountInput from 'components/AmountInput';
import DropButton from 'components/DropButton';
import ExchangeRateInfo from 'components/ExchangeRateInfo';
import FormErr from 'components/FormErr';
import ResultView from 'components/ResultView';
import React, { useState, useEffect } from 'react';
import {
  countriesForGetRate,
  KRW,
  receivingCountries,
  sendingCountries,
  USD,
} from 'utils/constants';
import {
  convertExchangeRate,
  getRateByKey,
  removeCommaAmount,
} from 'utils/utils';

type QuotesType = {
  [index: string]: number;
};

type DataStruc = {
  privacy: string;
  quotes: QuotesType;
  source: string;
  success: boolean;
  terms: string;
  timestamp: number;
};

type SelectedCountry = {
  sending: string;
  receiving: string;
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeData, setExchangeData] = useState<DataStruc | null>(null);
  const [targetAmount, setTargetAmount] = useState('');
  const [exchangeRateDisplay, setExchangeRateDisplay] = useState('0');
  const [resultView, setResultView] = useState(false);
  const [resultExchangeAmount, setResultExchangeAmount] = useState('0');
  const [selectedCountry, setSelectedCountry] = useState({
    sending: USD,
    receiving: KRW,
  });
  const [validStatus, setValidStatus] = useState({
    isValid: true,
    validMessage: '',
  });

  const onSelectSendingCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedCountry({ ...selectedCountry, sending: value });
  };

  const onSelectReceivingCountry = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = e.target;
    setSelectedCountry({ ...selectedCountry, receiving: value });
  };

  const onChangeAmount = (value: string) => {
    setTargetAmount(value);
  };

  const validateRemit = (val: string): boolean => {
    const { stringAmount } = removeCommaAmount(val);
    if (Number(stringAmount) <= 0) {
      setValidStatus({
        isValid: false,
        validMessage: '0이상의 값을 넣어주세요',
      });
      return false;
    }
    if (Number(stringAmount) > 10000) {
      setValidStatus({
        isValid: false,
        validMessage: '10,000이하의 값을 넣어주세요',
      });
      return false;
    }
    if (Number.isNaN(Number(stringAmount))) {
      setValidStatus({ isValid: false, validMessage: '숫자만 입력해주세요' });
      return false;
    }
    setValidStatus({ ...validStatus, isValid: true });
    return true;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateRemit(targetAmount)) {
      const resultValue = getRemittanceAmount();
      setResultExchangeAmount(resultValue);
      setResultView(true);
    }
  };

  const getCaledExchangeRate = (
    data: DataStruc | null,
    { sending, receiving }: SelectedCountry,
  ): number => {
    const sendingRate = data?.quotes ? data.quotes[getRateByKey(sending)] : 0;
    const receivingRate = data?.quotes
      ? data.quotes[getRateByKey(receiving)]
      : 0;
    const exchangedRate = convertExchangeRate({ sendingRate, receivingRate });
    return exchangedRate;
  };

  const fetchExchangeData = async () => {
    const { data } = await getExchangeRate(countriesForGetRate);
    setExchangeData(data);
    const rate = getCaledExchangeRate(data, selectedCountry);
    setExchangeRateDisplay(
      rate.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','),
    );
  };

  const getRemittanceAmount = () => {
    const rate = getCaledExchangeRate(exchangeData, selectedCountry);
    const { numberAmount } = removeCommaAmount(targetAmount);
    const remittanceAmount = numberAmount * rate;

    return remittanceAmount
      .toFixed(2)
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    setIsLoading(true);
    fetchExchangeData();
    setIsLoading(false);
  }, [selectedCountry]);

  if (isLoading) return <div>로딩중..</div>;

  return (
    <div>
      <h1>환율 계산</h1>
      <DropButton
        title="송금국가:"
        selectCountry={selectedCountry.sending}
        onSelectCountry={onSelectSendingCountry}
        countryList={sendingCountries}
      />
      <DropButton
        title="수취국가:"
        selectCountry={selectedCountry.receiving}
        onSelectCountry={onSelectReceivingCountry}
        countryList={receivingCountries}
      />
      <ExchangeRateInfo
        exchangeRateAmount={exchangeRateDisplay}
        receivingCountry={selectedCountry.receiving}
        sendingCountry={selectedCountry.sending}
      />
      <div>
        <form onSubmit={handleSubmit}>
          <AmountInput
            toExchangeAmount={targetAmount}
            onChangeAmount={onChangeAmount}
            unit={selectedCountry.sending}
          />
          {!validStatus.isValid && <FormErr msg={validStatus.validMessage} />}
          <div>
            <button data-cy="submit">Submit</button>
          </div>
        </form>
      </div>
      {resultView && (
        <ResultView
          resultValue={resultExchangeAmount}
          resultCountry={selectedCountry.receiving}
        />
      )}
    </div>
  );
}

export default App;
