import React, { useState } from "react";
import PropTypes from "prop-types";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowingS] = useState(isFollowing);
  const followMutation = useMutation(FOLLOW, { variables: { id } });
  const unFollowMutation = useMutation(UNFOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingS) {
      setIsFollowingS(false);
      unFollowMutation();
    } else {
      setIsFollowingS(true);
      followMutation();
    }
  };
  return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />;
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};
export default FollowButtonContainer;
