import { BASE_URL } from '../utils/constants';
import { getToken } from '../utils/functions';

export async function getRelation(id) {
  const url = `${BASE_URL}/getRelation?id=${id}`;
  const params = {
    headers: {
      // prettier-ignore
      Authorization: `Bearer${getToken()}`,
    },
  };

  try {
    const res = await fetch(url, params);
    const result = await res.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function follow(id) {
  const url = `${BASE_URL}/follow?id=${id}`;
  const params = {
    method: 'POST',
    headers: {
      // prettier-ignore
      Authorization: `Bearer${getToken()}`,
    },
  };

  try {
    const res = await fetch(url, params);
    const result = await res.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function unfollow(id) {
  const url = `${BASE_URL}/unfollow?id=${id}`;
  const params = {
    method: 'DELETE',
    headers: {
      // prettier-ignore
      Authorization: `Bearer${getToken()}`,
    },
  };

  try {
    const res = await fetch(url, params);
    const result = await res.json();
    return result;
  } catch (err) {
    return err;
  }
}
