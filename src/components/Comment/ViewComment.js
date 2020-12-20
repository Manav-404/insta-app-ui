import React, { useEffect } from "react";
import "./ViewComment.css";
import { useParams } from "react-router-dom";
import PostImageHelper from "../Post/helper/PostImageHelper";
import { getCommentsByPostId } from "./helper/commentHelper";
import { useState } from "react";
import { isAuthenticated } from "../Authentication/helper/authenticationHelper";
import ImageHelper from "../ImageHelper/ImageHelper";

const ViewComment = () => {
  const { postId } = useParams();
  const { user, token } = isAuthenticated();
  const [comment, setComment] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    getCommentsByPostId(token, postId)
      .then((data) => {
        setComment(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadComments = () => {
    return (
      <div className="comment__container">
        <div className="comment_left">
          <PostImageHelper post={postId} width={564} height={564} />
        </div>
        <div className="comment__right">
          <div className="comment_list">
            {comment.map((com, index) => {
              return (
                <div key={index} className="comment__item">
                  <ImageHelper id={com.user._id} size="small" />
                  <div className="comment__name">
                    <p>
                      <b>{com.user.username}</b> {com.comment}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  return <div>{loadComments()}</div>;
};

export default ViewComment;
