import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 50,
  duration: "45s",
};

export default function () {
  const res = http.get("http://127.0.0.1:3000/api/v1/cities");

  // Check response is 200
  if (res.status !== 200) {
    console.log("Fail: " + res.status);
  }

  sleep(1);
}