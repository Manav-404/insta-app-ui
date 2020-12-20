import React, { useState } from "react";
import "./Header.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import ImageHelper from "../ImageHelper/ImageHelper";
import { isAuthenticated } from "../Authentication/helper/authenticationHelper";
import { Redirect, Link } from "react-router-dom";
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded";
import { Menu, MenuItem, Card, CardContent } from "@material-ui/core";

const Header = () => {
  const { user } = isAuthenticated();
  const [home, setHome] = useState(false);
  const [post, setPost] = useState(false);
  const [searchkey, setSearchKey] = useState("");
  const [keyboardCode, setKeyboardCode] = useState("");

  const redirect = () => {
    if (home == true) {
      return <Redirect to="/home" />;
    }

    if (post == true) {
      return <Redirect to="/posts/create" />;
    }

    if (searchkey !== "" && keyboardCode === 13) {
      return <Redirect to={`/profile/search/${searchkey}`} />;
    }
  };

  const catchEvent = (event) => {
    setSearchKey(event.target.value);
    setKeyboardCode(event.charCode);
  };

  return (
    <div className="header__container">
      <div className="header__empty"></div>
      <div className="header__left">
        <p className="header__title">Instagram</p>
      </div>
      <div className="header__middle">
        <input
          type="search"
          className="header__search"
          name="search"
          placeholder="Search"
          autoComplete="off"
          onKeyPress={catchEvent}
        />
      </div>
      <div className="header__right">
        <HomeRoundedIcon onClick={() => setHome(true)} />
        <FavoriteBorderRoundedIcon />
        <PostAddRoundedIcon onClick={() => setPost(true)} />
        <Link to={`/profile/view/${user._id}`}>
          <ImageHelper id={user._id} size="small"></ImageHelper>
        </Link>
        {redirect()}
      </div>
      <div className="header__empty"></div>
    </div>
  );
};

export default Header;
