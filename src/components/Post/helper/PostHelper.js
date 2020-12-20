import { API } from "../../../backend";

export const createPost = (id, token, post) => {
  return fetch(`${API}/posts/create/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

export const getPostsByUser = (token, id) => {
  return fetch(`${API}/posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

export const getPostsByPostId = (token, id) => {
  return fetch(`${API}/posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

export const getFriendPostsByUser = (token, id) => {
  return fetch(`${API}/posts/friend/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

export const createBookmark = (postId, userId, token) => {
  return fetch(`${API}/posts/bookmark/${postId}/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

export const getBookmarksByUser = (userId, token) => {
  return fetch(`${API}/posts/bookmark/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};
