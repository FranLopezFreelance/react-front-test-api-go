import { TOKEN } from './constants';
import jwtDecode from 'jwt-decode';

export function isEmailValid(email) {
  // eslint-disable-next-line no-useless-escape
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailValid.test(String(email).toLowerCase());
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function isExpired(token){
  const { exp } = jwtDecode(token);
  const expire = exp * 1000;
  return (expire - Date.now() < 0) ? true : false;
}

export function isUserLoggedIn(){
  const token = getToken();
  if (token && !isExpired(token)) {
    return jwtDecode(token);
  }
  return null;
}

export function logOut(){
  localStorage.removeItem(TOKEN);
}
