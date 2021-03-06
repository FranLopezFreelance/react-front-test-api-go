import { BASE_URL, TOKEN } from '../utils/constants';

export async function signUp(user) {
  const data = {
    ...user,
    email: user.email.toLowerCase(),
    birthDate: new Date(),
  };

  delete data.repeatPassword;

  const url = `${BASE_URL}/auth/register`;

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(url, params);
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    } else {
      return {
        code: 500,
        message: 'Ha ocurrido un error.',
      };
    }
  } catch (err) {
    return err;
  }
}

export function signIn(user) {
  const url = `${BASE_URL}/auth/login`;

  const data = {
    ...user,
    email: user.email.toLowerCase(),
  };

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        return {
          code: res.status,
          message: 'Usuario y/o contraseña incorrectos.',
        };
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}
