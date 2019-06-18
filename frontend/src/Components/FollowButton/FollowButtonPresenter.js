import React from "react";
import Button from "../Button";

const FollowButtonPresenter = ({ isFollowing, onClick }) => (
  <Button text={isFollowing ? "Unfollow" : "follow"} onClick={onClick} />
);
export default FollowButtonPresenter;
