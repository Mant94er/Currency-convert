import fs from 'fs/promises';

const readCurrencies = async () => {
  const buff = await fs.readFile('./database/currencies/currencies.json');
  const json = buff.toString();
  const currencies = JSON.parse(json);
  return currencies;
};

const writeCurrencies = async (array) => {
  const json = JSON.stringify(array);
  await fs.writeFile('./database/currencies/currencies.json', json);
};

export { readCurrencies, writeCurrencies };
