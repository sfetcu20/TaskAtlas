import { decode } from 'jsonwebtoken';
import { axios, jwtCookie, router, toaster } from '../lib';
import { store } from '../auth';
import { setJwt } from '../auth/jwt-slice';

const login = async (ref, data) => {
  try {
    // Execute google recaptcha
    data['g-recaptcha-response'] = await ref.current.executeAsync();

    const { token } = await axios.post('login', data);
    const decoded = decode(token);
    if (!decoded) {
      throw new Error('Error! We cannot log you in at the moment');
    }
    store.dispatch(setJwt(token));
    jwtCookie.set(token);

    // notify user and other actions
    toaster.success('Login successful');
    switch (decoded.role) {
      case 'user':
        router.push('/user/jobs');
        break;
      case 'client':
        router.push('/client/jobs');
        break;
    }
  } catch (err) {
    toaster.error(err.message);

    // reset google recaptcha on invalid login
    ref.current.reset();
  }
};

export default login;
