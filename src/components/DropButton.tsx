import React from 'react';

type OnSelectCountryType = (e: React.ChangeEvent<HTMLSelectElement>) => void;

interface DropButtonProps {
  title: string;
  selectCountry: string;
  onSelectCountry: OnSelectCountryType;
  countryList: Array<string>;
}

function DropButton({
  title,
  selectCountry,
  onSelectCountry,
  countryList,
}: DropButtonProps) {
  return (
    <div>
      <span>{title}</span>
      <span>
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
      </span>
    </div>
  );
}

export default DropButton;
