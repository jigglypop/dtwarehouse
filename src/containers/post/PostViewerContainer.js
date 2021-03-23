// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { readPost, unloadPost } from '../../modules/post';
// import { readMyprofile } from '../../modules/myprofile';
// import PostViewer from '../../components/post/PostViewer';
// import PostButton from '../../components/post/PostButton';
// import { setOriginalPost } from '../../modules/update';
// import { removePost } from '../../lib/api/posts';

// const PostViewerContainer = ({ history, match }) => {
//   const { postId } = match.params;
//   const dispatch = useDispatch();
//   const { post, error, Listprofile } = useSelector(
//     ({ post, profile, myprofile }) => ({
//       post: post.post,
//       error: post.error,
//       Listprofile: myprofile.myprofile,
//     }),
//   );

//   useEffect(() => {
//     dispatch(readPost(postId));
//     dispatch(readMyprofile(parseInt(localStorage.getItem('user_id'))));
//     return () => {
//       dispatch(unloadPost());
//     };
//   }, [dispatch, postId]);

//   const onEdit = () => {
//     dispatch(setOriginalPost(post));
//     history.push(`/update/${postId}`);
//   };

//   const onRemove = async () => {
//     try {
//       await removePost(postId);
//       await history.push('/');
//       await window.location.reload();
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const current_user = localStorage.getItem('current_user');
//   if (post) {
//     const owner_id = post.profileid;
//     return (
//       <>
//         <PostViewer
//           post={post}
//           error={error}
//           postId={postId}
//           Listprofile={Listprofile}
//           userId={owner_id}
//           onEdit={onEdit}
//           onRemove={onRemove}
//         />
//       </>
//     );
//   } else {
//     return <></>;
//   }
// };

// export default withRouter(PostViewerContainer);
