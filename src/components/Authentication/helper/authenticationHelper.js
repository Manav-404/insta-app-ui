import { API } from "../../../backend";

export const Signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

export const Signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

export const authenticateUser = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return false;
  }
};

export const updateLocalStorage = (item, value) => {
  const data = localStorage.getItem(item);
  const existing = JSON.parse(data);
  existing["user"] = value;
  localStorage.setItem(item, JSON.stringify(existing));
};

export const updateFollowingCount = (item, value) => {
  const data = localStorage.getItem(item);
  const existing = JSON.parse(data);
  const arr = existing["user"].following;
  arr.push({ _id: value });
  localStorage.setItem(item, JSON.stringify(existing));
};
