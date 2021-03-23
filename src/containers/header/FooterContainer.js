import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: 'linear-gradient(45deg,#000000,#434343)',
    position: 'fixed',
    left: '0',
    bottom: '0',
    padding: '20px',
    height: '60px',
    width: '100%',
    display: 'inline',
    paddingLeft: 100,
    zIndex: 100,
  },
}));
const FooterContainer = ({ history }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <span className={classes.appBar}></span>
      </div>
    </>
  );
};

export default FooterContainer;
