const login = (user, password) => {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      user,
      password,
    }),
  });
};

const logout = () => {
  return fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

const isAuthenticated = async () => {
  try {
    const resp = await fetch('/auth');
    const { user } = await resp.json();
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export { isAuthenticated, login, logout };
