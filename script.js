import http from 'k6/http';

const num = Math.floor(Math.random() * 10000000);

export default () => {
  http.get(`http://localhost:3002/?id=${num}`);
};
