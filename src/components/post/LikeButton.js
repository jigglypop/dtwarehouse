import React, { useState, useCallback, useEffect } from 'react';
import client from '../../lib/api/client';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  Favorite: {
    color: red[500],
  },
}));
// 현재유저통채 // 포스트에 좋아요 누른유저 리스트 //포스트번호 //포스트주인번호
const LikeButton = ({ Listprofile, profiles, postId, profileid }) => {
  const classes = useStyles();
  const [owner, setOwner] = useState('');
  const { username } = Listprofile;

  const onClick = useCallback(() => {
    const getOwner = (profileid) => {
      client
        .get(`/api/miniprofile/${profileid}`)
        .then((res) => setOwner(res.data))
        .catch((e) => {
          return e;
        });
    };
    getOwner(profileid);
  }, [profileid]);

  useEffect(() => {
    const getOwner = (profileid) => {
      client
        .get(`/api/miniprofile/${profileid}`)
        .then((res) => setOwner(res.data))
        .catch((e) => {
          return e;
        });
    };
    getOwner(profileid);
  }, [profileid]);

  if (
    localStorage.getItem('current_user') &&
    localStorage.getItem('current_user').slice(1, -1) === username &&
    owner
  ) {
    const { user, posts } = Listprofile;
    const numlike = profiles.length;
    const bestcount = owner.bestcount;
    const onLike = async () => {
      // post에 postId
      await posts.splice(posts.indexOf(postId), 1);
      // profiles에 id
      await profiles.splice(profiles.indexOf(user), 1);

      await client
        .patch(`/api/miniprofile/${user}/`, {
          posts,
        })
        .then((res) => {
          return res;
        });
      await client
        .patch(`/api/miniprofile/${profileid}/`, {
          bestcount: bestcount - 1,
        })
        .then((res) => {
          return res;
        });

      await client
        .patch(`/api/minipost/${postId}/`, {
          profiles,
          numlike: profiles.length,
        })
        .then((res) => {
          return res;
        });
    };
    const onRemove = async () => {
      // post에 postId
      await posts.push(parseInt(postId));
      // profiles에 id
      await profiles.push(user);

      await client
        .patch(`/api/miniprofile/${user}/`, {
          posts,
        })
        .then((res) => {
          return res;
        });
      await client
        .patch(`/api/miniprofile/${profileid}/`, {
          bestcount: bestcount + 1,
        })
        .then((res) => {
          return res;
        });
      await client
        .patch(`/api/minipost/${postId}/`, {
          profiles,
          numlike: profiles.length,
        })
        .then((res) => {
          return res;
        });
    };

    return (
      <>
        <Button onClick={onClick} component={'span'}>
          <h4 style={{ color: 'white' }}>좋아요 {numlike}</h4>
          {profiles.indexOf(user) === -1 ? (
            <FavoriteBorder onClick={onRemove} style={{ color: 'white' }} />
          ) : (
            <Favorite className={classes.Favorite} onClick={onLike} />
          )}
        </Button>
      </>
    );
  } else {
    return <></>;
  }
};

export default LikeButton;
