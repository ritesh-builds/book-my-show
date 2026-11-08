import http from 'k6/http';

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
  // Har baar naye seat test ke liye (jaise B6)
  const url = 'http://localhost:3000/api/v1/shows/s1/lock';
  const userId = `User_${__VU}`;
  const payload = JSON.stringify({
    seatNumbers: ['B6'], // ◄── New vacant seat B6
    userId: userId,
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  // SAATH-SAATH TERMINAL PAR DEKHO:
  if (res.status === 200) {
    console.log(`\n🏆 WINNER: ${userId} successfully locked seat B6! (Status 200 OK)\n`);
  } else if (res.status === 409) {
    // Agar sabka print karenge toh 199 lines aayengi, isliye bas check confirm hai
  } else {
    console.log(`❌ ERROR: ${userId} got unexpected status ${res.status}`);
  }
}