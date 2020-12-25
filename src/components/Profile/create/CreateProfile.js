import React, { useState, useEffect } from "react";
import "../Profile.css";
import { Button, CircularProgress } from "@material-ui/core";
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
  const [loading, setLoading] = useState(false);
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

  const renderLoading = () => {
    if (loading == true) {
      return (
        <div className="circular__progress">
          <CircularProgress color="inherit" />
        </div>
      );
    }
  };
  const redirectToHome = () => {
    if (redirect === true) {
      updateLocalStorage("token", data);
      return <Redirect to="/home" />;
    }
  };

  const submitProfile = (event) => {
    setLoading(true);
    event.preventDefault();
    createProfile(token, formData, user._id)
      .then((data) => {
        setLoading(false);
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
        setLoading(false);
        setProfile({ ...profile, error: error, redirect: false, data: "" });
      });
  };

  const loadProfile = () => {
    if (loading === false) {
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
    }
  };

  return (
    <div>
      {renderLoading()}
      {errorOnSubmit()}
      {loadProfile()}
      {redirectToHome()}
    </div>
  );
};

export default CreateProfile;
