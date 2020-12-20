import React, { useEffect } from "react";
import Header from "../../Header/Header";
import "./PostCreate.css";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { createPost } from "../helper/PostHelper";
import { isAuthenticated } from "../../Authentication/helper/authenticationHelper";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const PostCreate = () => {
  const { user, token } = isAuthenticated();

  const [post, setPost] = useState({
    photo: "",
    caption: "",
    formData: "",
    error: "",
    redirect: false,
  });

  const { error, formData, redirect } = post;

  useEffect(() => {
    setPost({ ...post, formData: new FormData() });
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setPost({ ...post, [name]: value });
  };

  const onPostSubmit = (event) => {
    event.preventDefault();
    createPost(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setPost({
            ...post,
            error: data.error,
            redirect: false,
          });
        } else {
          setPost({
            photo: "",
            caption: "",
            error: "",
            redirect: true,
          });
        }
      })
      .catch((error) => {
        setPost({
          ...post,
          error: error,
          redirect: false,
        });
      });
  };

  const errorOnSubmit = () => {
    if (error !== "") {
      return <Alert severity="error">{error}</Alert>;
    }
  };

  const redirectOnSubmit = () => {
    if (redirect === true) {
      return <Redirect to={`/profile/view/${user._id}`} />;
    }
  };

  const loadPost = () => {
    return (
      <div className="create">
        <div className="create__container">
          <input
            accept="image/*"
            type="file"
            placeholder="Post picture"
            onChange={handleChange("photo")}
          />
          <input
            type="text"
            name="name"
            placeholder="Write a caption..."
            onChange={handleChange("caption")}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            fullWidth={true}
            onClick={onPostSubmit}
          >
            Post
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      {errorOnSubmit()}
      {redirectOnSubmit()}
      {loadPost()}
    </div>
  );
};

export default PostCreate;
