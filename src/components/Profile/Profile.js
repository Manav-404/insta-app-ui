import React from "react";
import { isAuthenticated } from "../Authentication/helper/authenticationHelper";
import { Redirect } from "react-router-dom";

const Profile = () => {
  const {
    user: { name },
  } = isAuthenticated();

  const redirectToHome = () => {
    return <Redirect to="/home" />;
  };

  const redirectToCreate = () => {
    return <Redirect to="/profile/create" />;
  };

  return <div>{!name ? redirectToCreate() : redirectToHome()}</div>;
};

export default Profile;
