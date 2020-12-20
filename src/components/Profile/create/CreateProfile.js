import React, { useState, useEffect } from "react";
import "../Profile.css";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { createProfile } from "../helper/profileHelper";
import {
  isAuthenticated,
  updateLocalStorage,
} from "../../Authentication/helper/authenticationHelper";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";

const CreateProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    link: "",
    photo: "",
    error: "",
    redirect: false,
    formData: "",
    data: "",
  });
  const { user, token } = isAuthenticated();
  const { name, bio, link, photo, error, redirect, formData, data } = profile;

  useEffect(() => {
    setProfile({ ...profile, formData: new FormData() });
  }, []);

  const handleChange = (name) => (event) => {
    const value = name == "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setProfile({ ...profile, [name]: value });
  };

  const errorOnSubmit = () => {
    if (error !== "") {
      return <Alert severity="error">{error}</Alert>;
    }
  };

  const redirectToHome = () => {
    if (redirect === true) {
      updateLocalStorage("token", data);
      return <Redirect to="/home" />;
    }
  };

  const submitProfile = (event) => {
    event.preventDefault();
    createProfile(token, formData, user._id)
      .then((data) => {
        if (data.error) {
          setProfile({
            ...profile,
            error: data.error,
            redirect: false,
            data: "",
          });
        } else {
          setProfile({
            name: "",
            bio: "",
            link: "",
            error: "",
            redirect: true,
            data: data,
          });
        }
      })
      .catch((error) => {
        setProfile({ ...profile, error: error, redirect: false, data: "" });
      });
  };

  const loadProfile = () => {
    return (
      <div className="profile">
        <div className="profile__container">
          <input
            accept="image/*"
            type="file"
            placeholder="Profile picture"
            onChange={handleChange("photo")}
          />
          <form>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange("name")}
            />
            <input
              type="text"
              name="bio"
              placeholder="Bio"
              onChange={handleChange("bio")}
            />
            <input
              type="text"
              name="link"
              placeholder="Link"
              onChange={handleChange("link")}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={submitProfile}
              fullWidth={true}
            >
              Create Profile
            </Button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      {errorOnSubmit()}
      {loadProfile()}
      {redirectToHome()}
    </div>
  );
};

export default CreateProfile;
