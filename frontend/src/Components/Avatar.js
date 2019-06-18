import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const getPx = size => {
  switch (size) {
    case "sm":
      return 30;
    case "md":
      return 50;
    case "lg":
      return 150;
    default:
      return 30;
  }
};

const getSize = size => {
  const px = getPx(size);
  return `
    width: ${px}px;
    height: ${px}px;
  `;
};

const Container = styled.div`
  ${props => getSize(props.size)};
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 50%;
`;

const Avatar = ({ size = "sm", url, className }) => (
  <Container className={className} size={size} url={url} />
);

Avatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"])
};

export default Avatar;
