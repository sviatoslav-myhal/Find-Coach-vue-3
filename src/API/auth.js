import axios from 'axios';

const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEiedkv66qenYseLRiFkEIO7suz5grUlY';
const SIGNIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEiedkv66qenYseLRiFkEIO7suz5grUlY';

export const setSignIn = async (user, mode) => {
  const url = mode === 'login' ? SIGNIN_URL : SIGNUP_URL;
  const response = await axios.post(url, user);

  try {
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const result = await response.data;

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
