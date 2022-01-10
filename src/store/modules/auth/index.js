import { setSignIn } from '@/API/auth';

let timer;

export default {
  state() {
    return {
      token: null,
      userId: null,
      setLogout: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.setLogout = false;
    },
    setLogout(state) {
      state.setLogout = true;
    }
  },
  actions: {
    async login(context, payload) {
      return context.dispatch('authorized', {
        ...payload,
        mode: 'login',
      });
    },
    async signup(context, payload) {
      return context.dispatch('authorized', {
        ...payload,
        mode: 'signup',
      });
    },
    logout(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      clearTimeout(timer);

      context.commit('setUser', {
        token: null,
        userId: null,
      })
    },
    async authorized(context, payload) {
      const mode = payload.mode;
      const user = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      };

      const responseData = await setSignIn(user, mode);

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', expirationDate);

      timer = setTimeout(() => context.dispatch('autoLogout'), expiresIn);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
      })
    },
    checkIsLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(() => context.dispatch('autoLogout'), expiresIn)

      if (token && userId) {
        context.commit('setUser', {
          token,
          userId,
        })
      }
    },
    autoLogout(context) {
      context.dispatch('logout');
      context.commit('setLogout')
    }
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthorized(state) {
      return !!state.token;
    },
    isAutoLogout(state) {
      return state.setLogout;
    }
  }
};
