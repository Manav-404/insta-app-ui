import React, { useState } from "react";
import "./Home.css";
import Header from "../Header/Header";
import ImageHelper from "../ImageHelper/ImageHelper";
import PostImageHelper from "../Post/helper/PostImageHelper";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { isAuthenticated } from "../Authentication/helper/authenticationHelper";
import {
  getFriendPostsByUser,
  createBookmark,
} from "../Post/helper/PostHelper";
import { postComment } from "../Comment/helper/commentHelper";
import { Redirect } from "react-router-dom";

const Home = () => {
  const { user, token } = isAuthenticated();

  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [redirect, setRedirect] = useState({
    toRedirect: false,
    postId: "",
  });
  const [bookmark, setBookmark] = useState("");
  const [redirectToProfile, setRedirectToProfile] = useState(false);

  const { toRedirect, postId } = redirect;

  const getFriendsPost = () => {
    getFriendPostsByUser(token, user._id)
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFriendsPost();
  }, []);

  const loadNothing = () => {
    return <h1 className="no__posts">No posts to show</h1>;
  };

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  const onRedirect = () => {
    if (toRedirect == true) {
      return <Redirect to={`/posts/comments/${postId}`} />;
    }
  };

  const onPostComment = (post) => {
    postComment(post._id, user._id, { comment: comment }, token)
      .then((data) => {
        setComment("");
        if (data.error) {
          console.log(data.error);
        } else {
          setRedirect({ ...redirect, toRedirect: true, postId: post._id });
        }
      })
      .catch((error) => {
        console.log(error);
        setComment("");
      });
  };

  const profileRedirect = () => {
    if (redirectToProfile === true) {
      return <Redirect to={`/profile/view/${user._id}`} />;
    }
  };

  const addToBookmark = () => {
    if (bookmark !== "") {
      createBookmark(bookmark, user._id, token)
        .then((data) => {
          if (data) {
            setRedirectToProfile(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const loadPosts = () => {
    return posts.map((post, index) => {
      return (
        <div key={index}>
          <div className="card__container">
            <div className="card__start">
              <div className="user">
                <div className="userpic">
                  <ImageHelper size="medium_small" id={post.user._id} />
                </div>
                <div className="usersname">
                  <p>{post.user.username}</p>
                </div>
              </div>
              <div className="bookmark">
                <BookmarkBorderIcon onClick={() => setBookmark(post._id)} />
              </div>
            </div>
            <div className="card__middle">
              <PostImageHelper post={post._id} width={614} height={400} />
            </div>
            <div className="card__end">
              <div className="card__caption">
                <div className="usersname">
                  <p>manav.d5</p>
                </div>
                <div className="caption">
                  <p>{post.caption}</p>
                </div>
              </div>
              <div className="card__comments">
                <p>View all comments</p>
              </div>
              <section className="section">
                <div className="card__send">
                  <input
                    className="comment_input"
                    placeholder="ADD A COMMENT"
                    type="text"
                    autoComplete="off"
                    onChange={onCommentChange}
                    value={comment}
                  />
                  <Button
                    onClick={() => onPostComment(post)}
                    style={{ color: "blue", marginLeft: 250, marginBottom: 10 }}
                  >
                    POST
                  </Button>
                </div>
              </section>
            </div>
          </div>
          <br />
          <br />
        </div>
      );
    });
  };

  const loadChecker = () => {
    if (posts.length > 0) {
      return <div>{loadPosts()}</div>;
    } else {
      return <div>{loadNothing()}</div>;
    }
  };
  return (
    <div>
      <Header />
      {loadChecker()}
      {onRedirect()}
      {profileRedirect()}
      {addToBookmark()}
    </div>
  );
};

export default Home;
