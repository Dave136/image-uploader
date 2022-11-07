import { default as $axios } from 'axios';

export default $axios.create({
  baseURL: 'http://localhost:5000',
});
