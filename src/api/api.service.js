import { makeRequest } from "../utils/helpers";
import { baseUrl, endPoints } from "./api.constants";

export const validateUsernamePassword = async (payloadData) => {
  return new Promise((resolve, reject) => {
    const url = baseUrl.AUTH + endPoints.validateUsername;
    // { username: "admin", password: "sriaditya" }
    const params = {
      method: "POST",
      body: JSON.stringify(payloadData),
    };

    makeRequest(url, params, (response) => {
      if (response && response.data) {
        resolve(response.data);
        // window.location.replace("/dashboard");
      } else {
        if (response?.errMsg && response.errMsg === "invalid token") {
          window.location.replace("/sign-in");
        }
        resolve({});
      }
    });
  });
};

export const getAllStudets = (payloadData) => {
  console.log({ params: payloadData }, "payloadData");
  return new Promise((resolve, reject) => {
    const url = baseUrl.STUDENTS + endPoints.getAllStudents;

    const params = {
      method: "POST",
      body: JSON.stringify({ params: payloadData }),
    };
    makeRequest(url, params, (response) => {
      if (response && response.data) {
        resolve(response.data);
      } else {
        resolve({});
      }
    });
  });
};

export const getAllClasses = () => {
  return new Promise((resolve, reject) => {
    const url = baseUrl.STUDENTS + endPoints.getAllClasses;

    const params = {
      method: "GET",
    };
    makeRequest(url, params, (response) => {
      if (response && response.data) {
        resolve(response.data);
      } else {
        resolve({});
      }
    });
  });
};

export const getAllVillages = () => {
  return new Promise((resolve, reject) => {
    const url = baseUrl.STUDENTS + endPoints.getAllVillages;

    const params = {
      method: "GET",
    };
    makeRequest(url, params, (response) => {
      if (response && response.data) {
        resolve(response.data);
      } else {
        resolve({});
      }
    });
  });
};

export const getAllTransportationModes = () => {
  return new Promise((resolve, reject) => {
    const url = baseUrl.STUDENTS + endPoints.getAllTransportationModes;

    const params = {
      method: "GET",
    };
    makeRequest(url, params, (response) => {
      if (response && response.data) {
        resolve(response.data);
      } else {
        resolve({});
      }
    });
  });
};

export const getAllSmsTemplates = () => {
  return new Promise((resolve, reject) => {
    const url = baseUrl.SMS + endPoints.getAllSmsTemplates;

    const params = {
      method: "GET",
    };
    makeRequest(url, params, (response) => {
      if (response && response.data) {
        resolve(response.data);
      } else {
        resolve({});
      }
    });
  });
};

export const postSendSmsToParent = (values, templateId) => {
  return new Promise((resolve, reject) => {
    const url = baseUrl.SMS + endPoints.postSendSmsToParent;

    const params = {
      method: "POST",
      body: JSON.stringify({ params: { values, templateId } }),
    };
    makeRequest(url, params, (response) => {
      if (response && response.data) {
        resolve(response.data);
      } else {
        resolve({});
      }
    });
  });
};
