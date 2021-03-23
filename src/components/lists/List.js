import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import client from '../../lib/api/client';
import LikeButton from '../post/LikeButton';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  Favorite: {
    color: red[500],
  },
  card: {
    maxWidth: 300,
    margin: '10px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PostItem = ({ item, current }) => {
  const {
    created_at,
    title,
    content,
    profileid,
    id,
    image_file,
    profiles,
  } = item;

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [owner, setOwner] = useState('');
  useEffect(() => {
    const getData = (profileid) => {
      client
        .get(`/api/miniprofile/${profileid}`)
        .then((res) => setOwner(res.data))
        .catch((e) => {
          return e;
        });
    };
    getData(profileid);
  }, []);
  const nickname = owner.nickname;
  const user_image = owner.user_image;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Link to={`/profile/${profileid}`}>
            <Avatar
              src={user_image}
              aria-label="recipe"
              className={classes.avatar}
            />
          </Link>
        }
        title={nickname}
        subheader={`${created_at}`}
      />

      <Link to={`/${id}`}>
        <CardMedia
          className={classes.media}
          image={
            image_file &&
            image_file.replace('http://localhost:8000/media/', '/static/')
          }
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <LikeButton
            Listprofile={current}
            profiles={profiles}
            postId={id}
            profileid={profileid}
          />
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <h3>{content}</h3>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const List = ({ lists, current }) => {
  if (lists && current) {
    return (
      <>
        <Grid container>
          {lists.map((item, index) => (
            <Grid key={index}>
              <PostItem item={item} key={index} current={current} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  } else {
    return <></>;
  }
};

export default React.memo(List);
