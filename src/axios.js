import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://academic-dashboard.firebaseio.com/'
});

export default instance;