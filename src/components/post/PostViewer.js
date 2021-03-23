import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import LikeButton from './LikeButton';
import ProfilecardContainer from '../../containers/profilecard/ProfilecardContainer';
import CommentContainer from '../../containers/comment/CommentContainer';
import PostButton from './PostButton';

const PostBlock = styled(Responsive)`
  margin-top: 4rem;
  color: white;
`;
const PostHead = styled.div`
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 40px;
    color: white;
    font-weight: 800;
  }
`;

const PostViewer = ({
  post,
  postId,
  Listprofile,
  userId,
  onEdit,
  onRemove,
}) => {
  if (post && Listprofile) {
    const {
      title,
      content,
      image_file,
      created_at,
      profiles,
      profileid,
    } = post;
    const current_user = localStorage.getItem('current_user');
    return (
      <>
        <PostBlock>
          <PostHead>
            {post && post.username === current_user && (
              <PostButton onEdit={onEdit} onRemove={onRemove} />
            )}
            <div>
              <h1>{title}</h1>
              <img src={image_file} alt="img" />
              <h2>{content}</h2>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'inline-block' }}>
                  <ProfilecardContainer userId={userId} followtrue={true} />
                </div>
                <div style={{ display: 'inline-block' }}>
                  <div style={{ display: 'inline-block' }}>
                    <h3>{created_at.slice(0, 10)}</h3>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <LikeButton
                      Listprofile={Listprofile}
                      profiles={profiles}
                      title={title}
                      postId={postId}
                      profileid={profileid}
                    />
                  </div>
                </div>
              </div>
            </div>
          </PostHead>

          <CommentContainer postId={postId} />
        </PostBlock>
      </>
    );
  } else {
    return <></>;
  }
};

export default PostViewer;
