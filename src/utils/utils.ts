interface AmountForStringAndNumber {
  stringAmount: string;
  numberAmount: number;
}

interface getRatesSendAndReceive {
  sendingRate: number;
  receivingRate: number;
}

export const convertPrice = (stringPrice: string): string => {
  const decimal = Number(stringPrice)
    .toFixed(2)
    .replace(/(^\d*[.]\d{3}$) | ([^0-9.]) |(^\d*[.]{2})/, '');
  const formatted = decimal.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  return formatted;
};

export const convertExchangeRate = (params: getRatesSendAndReceive): number => {
  const { sendingRate, receivingRate } = params;

  return receivingRate / sendingRate;
};

export const removeCommaAmount = (
  strAmount: string,
): AmountForStringAndNumber => {
  const stringAmount = strAmount.replace(/,/g, '');
  const numberAmount = Number(stringAmount);

  return { stringAmount, numberAmount };
};

export const getRateByKey = (selectedCountry: string): string =>
  `USD${selectedCountry}`;
