import jwt from 'jsonwebtoken';
import { pick } from 'lodash';
import Cookies from 'js-cookie';

const setJwtCookie = (token) => {
  const decoded = jwt.decode(token);
  const value = pick(decoded, ['name', 'role']);
  Cookies.set('jwt_token_me', JSON.stringify(value), {
    expires: 1, // 1 day
  });
};

const getJwtCookie = () => {
  try {
    const value = Cookies.get('jwt_token_me');
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
};

const removeJwtCookie = () => {
  Cookies.remove('jwt_token_me');
};

const jwtCookie = {
  set: setJwtCookie,
  get: getJwtCookie,
  remove: removeJwtCookie,
};

export default jwtCookie;
