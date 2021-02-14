import { BASE_URL } from '../utils/constants';
import { getToken } from '../utils/functions';

export function viewProfile(id) {
  const url = `${BASE_URL}/viewProfile?id=${id}`;
  const params = {
    headers: {
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': `Bearer${getToken()}`,
    },
  };

  return fetch(url, params)
    .then((res) => {
      // eslint-disable-next-line no-throw-literal
      if (res.status >= 400) throw null;
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
