import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 400,
  duration: "15s",
};

export default function () {
  const res = http.get("http://localhost:3000/api/v1/cities");

  // Check response is 200
  if (res.status !== 200) {
    console.log("Fail: " + res.status);
  }

  sleep(0.02);
}