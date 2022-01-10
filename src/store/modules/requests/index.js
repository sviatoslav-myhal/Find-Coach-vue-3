import { sendRequest } from '@/API/api';
import { getRequests } from '@/API/api';
import { deleteRequest } from '@/API/api';

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    }
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    loadRequests(state, payload) {
      state.requests = payload;
    },
    deleteRequest(state, payload) {
      state.requests = state.requests.filter(item => item.id !== payload);
    }
  },
  actions: {
    addRequest(context, payload) {
      sendRequest(payload.coachId, payload)
        .then(resolve => {
          payload.id = resolve.name
        })
      context.commit('addRequest', payload);
    },
    async loadRequests(context) {
      const requests = [];
      const token = context.rootGetters.token;
      const coachId = context.rootGetters.userId;
      const responseData = await getRequests(coachId, token);
      for (const key in responseData) {
        const request = {
          id: key,
          coachId: coachId,
          email: responseData[key].email,
          message: responseData[key].message,
        };

        requests.push(request);
      }

      context.commit('loadRequests', requests);
    },
    deleteRequest(context, payload) {
      const coachId = context.rootGetters.userId;
      deleteRequest(coachId, payload);
      context.commit('deleteRequest', payload);
    }
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter(request => request.coachId === coachId);
    },
    hasRequests(_, getters) {
      return getters?.requests?.length > 0;
    }
  },
};
