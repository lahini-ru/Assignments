import {
  API_BASE_URL1,
  API_BASE_URL2,
  API_BASE_URL3,
  API_BASE_URL4,
  TRANSACTION_LIST_SIZE,
  ACCESS_TOKEN
} from "../constants";

const request = options => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getAllTransactions(page, size) {
  page = page || 0;
  size = size || TRANSACTION_LIST_SIZE;

  return request({
    url: API_BASE_URL2 + "/transactions?page=" + page + "&size=" + size,
    method: "GET"
  });
}

export function getCategoryList() {
  return request({
    url: API_BASE_URL3 + "/category",
    method: "GET"
  });
}

export function createTransaction(transactionData) {
  return request({
    url: API_BASE_URL2 + "/transactions/add",
    method: "POST",
    body: JSON.stringify(transactionData)
  });
}

/* export function castVote(voteData) {
  return request({
    url: API_BASE_URL1 + "/polls/" + voteData.pollId + "/votes",
    method: "POST",
    body: JSON.stringify(voteData)
  });
} */

export function login(loginRequest) {
  return request({
    url: API_BASE_URL4 + "/oauth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest)
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL4 + "/oauth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest)
  });
}

export function checkUsernameAvailability(username) {
  return request({
    url: API_BASE_URL1 + "/user/checkUsernameAvailability?username=" + username,
    method: "GET"
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL1 + "/user/checkEmailAvailability?email=" + email,
    method: "GET"
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL1 + "/user/me",
    method: "GET"
  });
}

export function getUserProfile(username) {
  return request({
    url: API_BASE_URL1 + "/users/" + username,
    method: "GET"
  });
}

export function getIncomeTransactions(username, page, size) {
  page = page || 0;
  size = size || TRANSACTION_LIST_SIZE;

  return request({
    url:
      API_BASE_URL1 +
      "/users/" +
      username +
      "/polls?page=" +
      page +
      "&size=" +
      size,
    method: "GET"
  });
}

export function geExpensesTransactions(username, page, size) {
  page = page || 0;
  size = size || TRANSACTION_LIST_SIZE;

  return request({
    url:
      API_BASE_URL1 +
      "/users/" +
      username +
      "/votes?page=" +
      page +
      "&size=" +
      size,
    method: "GET"
  });
}
