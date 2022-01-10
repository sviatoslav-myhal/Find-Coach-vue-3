import { sendCoaches } from '../../../API/api';
import { getCoaches } from '../../../API/api';

export default {
  namespaced: true,
  state() {
    return {
      coaches: [],
    }
  },
  mutations: {
    addCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
  },
  actions: {
    addCoach(context, payload) {
      const userId = context.rootGetters.userId;
      const token = context.rootGetters.token;
      sendCoaches(userId, payload, token);

      context.commit('addCoach', {
        ...payload,
        id: userId,
      });
    },
    async loadCoaches(context) {
      const coaches = [];
      const responseData = await getCoaches();

      for (const key in responseData) {
        const coach = {
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
          id: key,
        }

        coaches.push(coach);
      }

      context.commit('setCoaches', coaches)
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state?.coaches?.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;

      return coaches.some(coach => coach.id === userId);
    }
  },
};
