import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const Section = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  margin-bottom: 50px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
`;

export default ({ term, loading, data }) => {
  if (!term) {
    return (
      <Wrapper>
        <FatText text="Search For SomeThing" />
      </Wrapper>
    );
  } else if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && (data.searchUser || data.searchPost)) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length ? (
            data.searchUser.map(user => (
              <UserCard
                id={user.id}
                key={user.id}
                userName={user.userName}
                isFollowing={user.isFollowing}
                isSelf={user.isSelf}
                url={user.avatar}
              />
            ))
          ) : (
            <FatText text="No user found" />
          )}
        </Section>
        <PostSection>
          {data.searchPost.length ? (
            data.searchPost.map(post => (
              <SquarePost
                id={post.id}
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0].url}
              />
            ))
          ) : (
            <FatText text="No photo found" />
          )}
        </PostSection>
      </Wrapper>
    );
  } else {
    return <Wrapper />;
  }
};
