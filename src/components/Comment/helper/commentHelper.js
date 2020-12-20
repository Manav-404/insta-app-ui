const { API } = require("../../../backend");

exports.postComment = (post, user, comment, token) => {
  return fetch(`${API}/posts/comment/create/${post}/${user}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

exports.getCommentsByPostId = (token, id) => {
  return fetch(`${API}/posts/comment/${id}`, {
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
