import axios from 'axios';

axios.defaults.baseURL = 'https://coach-finder-5ee58-default-rtdb.europe-west1.firebasedatabase.app/';

export const sendCoaches = async (id, newCoach, token) => {
  const response = await axios.put(`coaches/${id}.json?auth=${token}`, newCoach);

  try {
    const result = await response.data;


    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCoaches = async () => {
  const response = await axios.get('coaches.json');

  try {
    const result = await response.data;


    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const sendRequest = async (id, newRequest) => {
  const response = await axios.post(`requests/${id}.json`, newRequest)

  try {
    const result = await response.data;

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const getRequests = async (id, token) => {
  const response = await axios.get(`requests/${id}.json?auth=${token}`)

  try {
    const result = await response.data;

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteRequest = async (userId, id) => {
  const response = await axios.delete(`requests/${userId}/${id}.json`)

  try {
    const result = await response.data;

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
