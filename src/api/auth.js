import { BASE_URL } from '../utils/constants';

export function signUp(user) {
  const tempUser = {
    ...user,
    email: user.email.toLowerCase(),
    birthDate: new Date()
  };
  delete tempUser.repeatPassword;
  const url = `${BASE_URL}/auth/register`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tempUser)
  }

  return fetch(url, params).then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    } else {
      console.log(res);
      return { code: 400, message: "Email ya existe" }
    }
  }).then(result => {
    return result;
  }).catch(err => {
    return err;
  });
}