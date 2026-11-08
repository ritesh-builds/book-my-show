import http from 'k6/http';
import { check } from 'k6';

// Concurrency Test: 200 Virtual Users try to lock the EXACT SAME SEAT (A1) at the same millisecond!
// Expected Result: Exactly 1 user gets 200 OK, 199 users get 409 Conflict (Double Booking Blocked).

export const options = {
  scenarios: {
    seat_race_condition: {
      executor: 'per-vu-iterations',
      vus: 200,
      iterations: 1,
      maxDuration: '10s',
    },
  },
};

export default function () {
  const url = 'http://localhost:3000/api/v1/shows/s1/lock';
  const payload = JSON.stringify({
    seatNumbers: ['A1'],
    userId: `user_vu_${__VU}`,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'Is 200 (Winner) or 409 (Blocked)': (r) => r.status === 200 || r.status === 409,
  });
}

