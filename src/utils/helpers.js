import { APP_URL } from "../api/api.constants";

export const getCookieToken = (n) => {
  let a = `; ${document.cookie};`.match(`;\\s*${n}=([^;]+)`);
  return a ? a[1] : "";
};

export const makeRequest = (url, params, callback) => {
  let headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  headers["a_t"] = getCookieToken("a_t") || null;
  const payload = {
    ...params,
    headers: headers,
    credentials: "include",
  };
  fetch(APP_URL + url, payload)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("Error", error.statusCode);
      //   console.log({ error: 1, error_msg: error });
    })
    .then((res) => {
      if (res?.errMsg && res.errMsg === "invalid token") {
        // window.location.replace("/sign-in");
      } else {
        callback(res);
      }
    });
};
