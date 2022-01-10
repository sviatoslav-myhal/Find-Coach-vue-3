import axios from 'axios';

const signUp_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEiedkv66qenYseLRiFkEIO7suz5grUlY';
const signIn_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEiedkv66qenYseLRiFkEIO7suz5grUlY';

export const setSignIn = async (user, mode) => {
  const url = mode === 'login' ? signIn_url : signUp_url;
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
