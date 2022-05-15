import React from "react";
import { API } from "../../../backend";

const PostImageHelper = ({ post, width, height }) => {
  const imageUrl = post;
  const loadImages = () => {
    return <img src={imageUrl} width={width} height={height} />;
  };

  return <div>{loadImages()}</div>;
};

export default PostImageHelper;
