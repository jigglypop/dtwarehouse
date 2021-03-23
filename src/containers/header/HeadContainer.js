import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../modules/user';
import { setOpener } from '../../modules/opener';
import { setPosition } from '../../modules/position';

import { unsetOpenpost } from '../../modules/openpost';

import { unloadMyprofile } from '../../modules/myprofile';
import { initializeForm, initializeAuth } from '../../modules/auth';
// 바꾸기
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';

import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Avatar from '@material-ui/core/Avatar';

import styled from 'styled-components';
import OpenerContainer from '../opener/OpenerContainer';
import OpenePost from '../opener/OpenPost';

import { DrawerSet } from './DrawerSet';

const TextItem = styled.h1`
  font-family: 'NanumBarunGothicSubset.woff2' !important;
  font-weight: 800px;
  color: white;
  font-size: 12px;
  margin-left: 10px;
  margin-bottom: 0;
  text-shadow: 2px 2px 2px black;
  cursor: pointer;
`;

const NameItem = styled.h1`
  font-family: 'NanumBarunGothicSubset.woff2' !important;
  font-weight: 800px;
  color: white;
  font-size: 15px;
  margin-bottom: 0;
  text-shadow: 2px 2px 2px black;
`;

const ColorberryItem = styled.h1`
  font-family: 'NanumBarunGothicSubset.woff2' !important;
  font-weight: 800px;
  color: white;
  font-size: 20px;
  text-shadow: 2px 2px 20px white;
  animation: blink 1.5s ease-in-out infinite alternate;
  cursor: pointer;
  @keyframes blink {
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
`;

const MenuBlock = styled.div`
  .inline {
    display: inline-block;
    vertical-align: middle;
  }
  .outer {
    display: inline-block;
  }
  .inline-right {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
`;
const drawerWidth = 160;

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'linear-gradient(45deg,#000000,#434343)',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },

  drawerPaper: {
    background: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));
const HeadContainer = () => {
  const dispatch = useDispatch();
  const { user, minipost, myprofile } = useSelector(
    ({ user, minipost, myprofile }) => ({
      user: user.user,
      minipost: minipost.minipost,
      myprofile: myprofile.myprofile,
    }),
  );
  const onLogout = () => {
    dispatch(logout());
    dispatch(initializeForm('register'));
    dispatch(initializeForm('login'));
    dispatch(initializeAuth());
    dispatch(unloadMyprofile());
  };
  const onGoGallery = () => {
    dispatch(setPosition({ positionX: 33, positionY: 97, positionZ: 923 }));
  };
  const onGoMuseum = () => {
    dispatch(setPosition({ positionX: 600, positionY: 2600, positionZ: 1000 }));
  };
  return (
    <Header
      user={user}
      onLogout={onLogout}
      minipost={minipost}
      myprofile={myprofile}
      onGoGallery={onGoGallery}
      onGoMuseum={onGoMuseum}
    />
  );
};

export default HeadContainer;

const Header = ({ user, onLogout, myprofile, onGoGallery, onGoMuseum }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const user_image = '';
  return (
    <div>
      {user ? (
        <>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <MenuBlock>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div className="outer">
                  <div className="inline" style={{ marginLeft: '20px' }}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      className={clsx(classes.menuButton, open && classes.hide)}
                    >
                      <MenuIcon />
                    </IconButton>
                  </div>
                  <div className="inline" onClick={onGoMuseum}>
                    <ColorberryItem>COLOR BERRY</ColorberryItem>
                  </div>
                </div>
                <div
                  className="outer"
                  style={{
                    marginRight: '40px',
                  }}
                >
                  <div className="inline" onClick={onGoGallery}>
                    <TextItem>작품 관람</TextItem>
                  </div>
                  <div className="inline-right" onClick={onGoMuseum}>
                    <TextItem>미술관</TextItem>
                  </div>
                  <div className="inline">
                    <Avatar
                      src={user_image}
                      style={{
                        border: '2px solid white',
                        marginTop: '5px',
                        marginRight: '10px',
                      }}
                    />
                  </div>

                  <div className="inline">
                    <NameItem>{myprofile ? myprofile.username : ''}</NameItem>
                  </div>
                  <div className="inline" onClick={onLogout}>
                    <TextItem>로그아웃</TextItem>
                  </div>
                </div>
              </div>
            </MenuBlock>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon style={{ color: 'white' }} />
                ) : (
                  <ChevronRightIcon style={{ color: 'white' }} />
                )}
              </IconButton>
            </div>
            <List style={{ marginLeft: 10 }}>
              {DrawerSet.map((item, index) => (
                <DrawerItem item={item} key={index} />
              ))}
            </List>
          </Drawer>
        </>
      ) : (
        ''
      )}
      <OpenerContainer />
      <OpenePost />
    </div>
  );
};
const DraverDiv = styled.div`
  cursor: pointer;
`;
const DrawerItem = ({ item }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setOpener(item.url));
    dispatch(unsetOpenpost());
  };
  return (
    <DraverDiv onClick={onClick}>
      <h1
        style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: 800,
          marginTop: '20px',
          textShadow: '2px 2px 2px black',
        }}
      >
        {item.drawername}
      </h1>
    </DraverDiv>
  );
};
