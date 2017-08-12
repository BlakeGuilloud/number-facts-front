import axios from 'axios';

const API_URL = 'https://4rhgam1wag.execute-api.us-east-1.amazonaws.com/dev/register';

export function register(data) {
  const payload = {
    method: 'post',
    url: API_URL,
    data,
  }
  console.log('payload : ', payload);
  return axios(payload)
    .then(console.log)
    .catch(console.error);
}