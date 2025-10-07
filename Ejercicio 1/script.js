import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


const users = new SharedArray('users', function() {
  return open('./users.csv').split('\n').slice(1).map(line => {
    const [user, passwd] = line.split(',');
    return { user, passwd };
  });
});

export const options = {
  stages: [
    { duration: '1m', target: 30 }, 
    { duration: '3m', target: 25 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'], 
    http_req_failed: ['rate<0.03'], 
  },
};

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];
  
  const payload = JSON.stringify({
    username: user.user,
    password: user.passwd,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: '60s',
  };

  const response = http.post('https://fakestoreapi.com/auth/login', payload, params);

  // Validaciones
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 1500ms': (r) => r.timings.duration < 1500,
    'has token in response': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.token !== undefined;
      } catch {
        return false;
      }
    },
  });

  sleep(1); 
}

export function handleSummary(data) {
  return {
    "summary.json": JSON.stringify(data),
    "informe/informe.html": htmlReport(data),
  };
}