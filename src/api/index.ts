import axios from 'axios';

const getExchangeRate = (countries: Array<string>) => {
  const params = countries.length ? `&currencies=${countries.join()}` : '';
  console.log(process.env.REACT_APP_API_KEY);
  return axios.get(
    `http://api.currencylayer.com/live?access_key=${process.env.REACT_APP_API_KEY}${params}`,
  );
};

export default getExchangeRate;
