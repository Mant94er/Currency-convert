import fs from 'fs/promises';

const getUserByName = async (email) => {
  const accounts = await readAccounts();

  return accounts.find(
    (acc) => acc.user.toLocaleLowerCase() === email.toLocaleLowerCase()
  );
};

const readAccounts = async () => {
  const buff = await fs.readFile('./database/accounts/accounts.json');
  const json = buff.toString();
  const accounts = JSON.parse(json);
  return accounts;
};

const writeAccounts = async (array) => {
  const json = JSON.stringify(array);
  await fs.writeFile('./database/accounts/accounts.json', json);
};

export { readAccounts, writeAccounts, getUserByName };
