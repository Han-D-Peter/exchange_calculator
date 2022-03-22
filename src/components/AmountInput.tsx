import React from 'react';
import { removeCommaAmount } from 'utils/utils';

type onChangeAmount = (value: string) => void;

type AmountInputProps = {
  toExchangeAmount: string;
  onChangeAmount: onChangeAmount;
  unit: string;
};

const checkRegax = (value: string) => {
  const regNum = /^[0-9]*$/;

  return regNum.test(value);
};
function AmountInput({
  toExchangeAmount,
  onChangeAmount,
  unit,
}: AmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { stringAmount, numberAmount } = removeCommaAmount(value);

    if (stringAmount.length > 17) return;
    if (!checkRegax(stringAmount)) return;

    const commaAmount = numberAmount.toLocaleString();

    if (commaAmount === '0') {
      onChangeAmount('');
    } else {
      onChangeAmount(commaAmount);
    }
  };

  return (
    <>
      <span>송금액:</span>
      <input onChange={handleChange} value={toExchangeAmount} />
      <span>{unit}</span>
    </>
  );
}

export default AmountInput;
