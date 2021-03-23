import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HeaderContainer from './containers/header/HeadContainer';
import FooterContainer from './containers/header/FooterContainer';
import MainContainer from './containers/main/MainContainer';

const App = () => {
  return (
    <>
      <MainContainer />
      <HeaderContainer />
      <Route component={MainPage} path="/" />
      <FooterContainer />
    </>
  );
};
export default App;
