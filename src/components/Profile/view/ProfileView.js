import React, { useEffect } from "react";
import "../Profile.css";
import Header from "../../Header/Header";
import ImageHelper from "../../ImageHelper/ImageHelper";
import { useParams, Link, Redirect } from "react-router-dom";
import {
  isAuthenticated,
  updateLocalStorage,
  updateFollowingCount,
} from "../../Authentication/helper/authenticationHelper";
import { useState } from "react";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { getProfileById, addAndNotify } from "../helper/profileHelper";
import { Tabs, Tab } from "@material-ui/core";
import GridOnIcon from "@material-ui/icons/GridOn";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import {
  getPostsByUser,
  getBookmarksByUser,
} from "../../Post/helper/PostHelper";
import PostImageHelper from "../../Post/helper/PostImageHelper";

const ProfileView = () => {
  let { id } = useParams();
  const { user, token } = isAuthenticated();
  const [own, setOwn] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({
    uid: "",
    username: "",
    name: "",
    bio: "",
    link: "",
    followers: [],
    following: [],
  });

  const [value, setValue] = useState("one");
  const [post, setPost] = useState([]);
  const [add, setAdd] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    getProfile();
    getPosts();
    checker();
    followChecker();
    getBookmarks();
  }, [id]);

  const { username, name, bio, link, followers, following } = profile;

  const checker = () => {
    if (id === user._id) {
      setOwn(true);
    }
  };

  const followChecker = () => {
    user.following.map((friend, index) => {
      if (friend._id == id) {
        setIsFollowing(true);
      }
    });
  };

  const getProfile = () => {
    getProfileById(id, token)
      .then((data) => {
        setProfile({
          uid: data._id,
          username: data.username,
          name: data.name,
          bio: data.bio,
          link: data.link,
          followers: data.followers,
          following: data.following,
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  const getBookmarks = () => {
    getBookmarksByUser(user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setBookmark(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPosts = () => {
    getPostsByUser(token, id)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  // const loadPosts = () => {
  //   return <div className="photo__grid"></div>;
  // };

  const buttonChecker = () => {
    if (own === true) {
      return <button className="edit_button">Edit Profile</button>;
    } else {
      if (user.following.length !== 0) {
        if (isFollowing == true) {
          return <button className="edit_button">Following</button>;
        } else {
          return (
            <button className="follow_button" onClick={() => setAdd(true)}>
              Follow
            </button>
          );
        }
      } else {
        return (
          <button className="follow_button" onClick={() => setAdd(true)}>
            Follow
          </button>
        );
      }
    }
  };

  const addToFollowing = () => {
    if (add === true) {
      addAndNotify(token, user._id, profile.uid)
        .then((data) => {
          updateFollowingCount("token", data.to_user);
        })
        .catch((error) => {
          console.log(error);
        });

      return <Redirect to="/home" />;
    }
  };

  const loadPosts = () => {
    if (post.length > 0) {
      return (
        <div className="profile__posts">
          {post.map((p, i) => {
            return (
              <PostImageHelper key={i} post={p._id} width={293} height={293} />
            );
          })}
        </div>
      );
    } else {
      return;
    }
  };

  const loadBookmarks = () => {
    if (bookmark.length > 0) {
      return (
        <div className="profile__posts">
          {bookmark.map((p, i) => {
            return (
              <PostImageHelper key={i} post={p._id} width={293} height={293} />
            );
          })}
        </div>
      );
    }
  };

  const postBookmarkChecker = () => {
    if (value === "one") {
      return <div>{loadPosts()}</div>;
    } else {
      return <div>{loadBookmarks()}</div>;
    }
  };

  const loadTop = () => {
    return (
      <div className="profile__main">
        <div className="profile__image">
          <ImageHelper size="large" id={id} />
        </div>
        <div className="profile__info">
          <div className="profile__username">
            <div className="username">
              <p>{username}</p>
            </div>
            <div className="edit">{buttonChecker()}</div>
            <div className="settings">
              <SettingsOutlinedIcon style={{ fontSize: 30 }} />
            </div>
          </div>
          <div className="profile__following">
            <div className="post">
              <b>{post.length > 0 ? post.length : 0}</b> posts
            </div>
            <div className="followers">
              <b>{followers.length} </b>followers
            </div>
            <div className="following">
              <b>{following.length} </b> following
            </div>
          </div>
          <div className="profile__bio">
            <h3 className="name">{name}</h3>
            <p>{bio}</p>
    <a href={link}> {link}</a>
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  const loadBottom = () => {
    return (
      <div className="profile__bottom">
        <div className="profile__tab">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            TabIndicatorProps={{ style: { backgroundColor: "black" } }}
          >
            <Tab value="one" icon={<GridOnIcon />}></Tab>
            {own === true ? (
              <Tab value="two" icon={<BookmarkBorderIcon />}></Tab>
            ) : (
              ""
            )}
          </Tabs>
        </div>
        <div>{postBookmarkChecker()}</div>
      </div>
    );
  };

  const loadProfile = () => {
    return (
      <div>
        <Header />
        {loadTop()}
        {loadBottom()}
        {addToFollowing()}
      </div>
    );
  };
  return <div>{loadProfile()}</div>;
};

export default ProfileView;
