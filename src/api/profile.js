import { BASE_URL } from '../utils/constants';
import { getToken } from '../utils/functions';

export async function viewProfile(id) {
  const url = `${BASE_URL}/viewProfile?id=${id}`;
  const params = {
    headers: {
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': `Bearer${getToken()}`,
    },
  };

  try {
    const res = await fetch(url, params);
    if (res.status >= 400)
      throw new Error('No se pudo obtener los datos de perfil');
    const result = await res.json();
    return result;
  } catch (err) {
    return err;
  }
}

/**
 * Returns Promise call to server.
 *
 * @param {object} data Profile updated info.
 * @return {Promise} Promise.
 */
export async function updateProfileInfo(data) {
  const url = `${BASE_URL}/updateProfile`;
  const params = {
    method: 'PUT',
    headers: {
      // prettier-ignore
      'Authorization': `Bearer${getToken()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((res) => res)
    .catch((err) => err);
}

/**
 * Returns Promise call to server.
 *
 * @param {number} id Profile ID.
 * @param {file} file The file that you want to upload.
 * @param {string} key The model that you want to update.
 * @return {Promise} Promise.
 */
export async function uploadFIle(id, file, key) {
  let route;
  switch (key) {
    case 'banner':
      route = 'uploadBanner';
      break;
    default:
      route = 'uploadAvatar';
  }
  const url = `${BASE_URL}/${route}?id=${id}`;

  const formData = new FormData();

  formData.append(key, file);

  const params = {
    method: 'POST',
    headers: {
      // prettier-ignore
      'Authorization': `Bearer${getToken()}`,
    },
    body: formData,
  };

  try {
    const res = await fetch(url, params);
    const result = await res.json();
    return result;
  } catch (err) {
    return err;
  }
}
