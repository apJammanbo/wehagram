import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  location,
  caption,
  createdAt
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");

  const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });

  const addCommentMutation = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });

  useEffect(
    () => {
      const total = files.length;
      const nextIndex = currentItem === total - 1 ? 0 : currentItem + 1;
      const timer = setTimeout(() => setCurrentItem(nextIndex), 3000);
      return () => {
        clearTimeout(timer);
      };
    },
    [currentItem]
  );

  const toggleLike = async () => {
    if (isLikedS) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }

    try {
      await toggleLikeMutation();
    } catch {
      setIsLiked(isLiked);
      setLikeCount(likeCount);
    }
  };

  const onKeyPress = async event => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      if (comment.value) {
        // addCommentMutation();
        comment.setValue("");
        try {
          const {
            data: { addComment }
          } = await addCommentMutation();
          setSelfComments([...selfComments, addComment]);
        } catch {}
      }
    }
  };

  return (
    <PostPresenter
      user={user}
      files={files}
      isLiked={isLikedS}
      likeCount={likeCountS}
      comments={comments}
      location={location}
      caption={caption}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;
