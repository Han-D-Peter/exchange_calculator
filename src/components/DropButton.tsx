import React from 'react';

type OnSelectCountryType = (e: React.ChangeEvent<HTMLSelectElement>) => void;

interface DropButtonProps {
  selectCountry: string;
  onSelectCountry: OnSelectCountryType;
  countryList: Array<string>;
}

function DropButton({
  selectCountry,
  onSelectCountry,
  countryList,
}: DropButtonProps) {
  return (
    <select
      name="country"
      onChange={onSelectCountry}
      defaultValue={selectCountry}
    >
      {countryList.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
}

export default DropButton;
