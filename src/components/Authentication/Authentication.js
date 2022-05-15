import React, { useState, useEffect } from "react";
import "./Authentication.css";
import logo from "../../logo.png";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import {
  Signup,
  Signin,
  authenticateUser,
} from "./helper/authenticationHelper";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const Authentication = () => {
  const [signup, setSignup] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
    redirect: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSignup(false);
  }, []);

  const { username, email, password, error, redirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value , error:'' });
  };

  const redirectToProfile = () => {
    if (redirect === true) {
      return <Redirect to="/profile" />;
    }
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
          <CircularProgress color="inherit" size={50} />
        </div>
      );
    }
  };

  const onSignUpSubmit = (event) => {

    if(!username || !email || !password){
      setValues({...values , error: 'All fields are required.'})
      return;
    }

    // if(!email.toLowerCase().match('/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i')){
    //   setValues({...values , error: 'Invalid email id'})
    //   return;
    // }

    // if(!password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')){
    //   setValues({...values, error: 'Password requires atleat 8 characters, 1 uppercase, 1 lowercase and 1 special character.'})
    //   return;
    // }

    setLoading(true);
    event.preventDefault();
    Signup({ username, email, password })
      .then((data) => {
        setLoading(false);
        if (data.error) {
          setValues({ ...values, error: data.error, redirect: false });
        } else {
          setValues({
            username: "",
            email: "",
            password: "",
            error: "",
            redirect: true,
          });
        }
      })
      .catch((error) => {
        setValues({ ...values, error: error, redirect: false });
      });
  };

  const onSignInSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    Signin({ email, password })
      .then((data) => {
        setLoading(false);
        if (data.error) {
          setValues({ ...values, error: data.error, redirect: false });
        } else {
          authenticateUser(data, () => {
            setValues({
              username: "",
              email: "",
              password: "",
              error: "",
              redirect: true,
            });
          });
        }
      })
      .catch((error) => {
        setValues({ ...values, error: error, redirect: false });
      });
  };

  const loadSignup = () => {
    if (loading === false) {
      return (
        <div className="auth">
          <div className="signup__container">
            <img src={logo} alt="" height="50" width="50" />
            <div className="title">Instagram</div>
            <form>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChange("username")}
              />
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleChange("email")}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleChange("password")}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={onSignUpSubmit}
                fullWidth={true}
              >
                Sign Up
              </Button>
            </form>
            <p className="signup__text" onClick={() => setSignup(false)}>
              Already have an account ? Login
            </p>
          </div>
        </div>
      );
    }
  };

  const login = () => {
    if (loading === false) {
      return (
        <div className="auth">
          <div className="login__container">
            <img src={logo} alt="" height="50" width="50" />
            <div className="title">Instagram</div>
            <form>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                id=""
                onChange={handleChange("email")}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange("password")}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={onSignInSubmit}
                fullWidth={true}
              >
                Log In
              </Button>
            </form>
            <p className="signup__text" onClick={() => setSignup(true)}>
              Don't have an account ? Signup
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {renderLoading()}
      {errorOnSubmit()}
      {redirectToProfile()}
      {!signup ? login() : loadSignup()}
    </div>
  );
};

export default Authentication;
