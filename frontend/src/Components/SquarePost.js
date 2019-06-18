import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HeartFull, CommentFull } from "./Icons";

const OverLay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.3s linear;
  svg {
    fill: white;
  }
`;

const Container = styled.div`
  background-image: url(${props => props.bg});
  background-size: cover;
  &:hover {
    ${OverLay} {
      opacity: 1;
    }
  }
`;

const Number = styled.div`
  display: flex;
  color: white;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

const SquarePost = ({ likeCount, commentCount, file }) => (
  <Container bg={file}>
    <OverLay>
      <Number>
        <HeartFull /> <NumberText>{likeCount}</NumberText>
      </Number>
      <Number>
        <CommentFull /> <NumberText>{commentCount}</NumberText>
      </Number>
    </OverLay>
  </Container>
);

SquarePost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired
};

export default SquarePost;
