const BASE_URL = 'https://free.currconv.com/api/v7/';
const API_KEY = 'b9b1ecddf599e30eb635';

const getCurrencies = async () => {
  const url = new URL('currencies', BASE_URL);
  url.searchParams.set('apiKey', API_KEY);
  const response = await fetch(url)
  const data = await response.json();
  return data;
}

const getCoefficients = async (currency_one, currency_two) => {
  const url = new URL('convert', BASE_URL);
  url.searchParams.set('apiKey', API_KEY);
  url.searchParams.set('q', `${currency_one.toUpperCase()}_${currency_two.toUpperCase()},${currency_two.toUpperCase()}_${currency_one.toUpperCase()}`);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch {
    alert('Currency API provider server seems to be down :(')
  }
}

export {getCurrencies, getCoefficients};
