import './App.css';
import React, {useContext} from 'react';
import Header from './components/Header';
import UserTable from './components/Table';
import Posts from './components/Posts';
import ValidationTextFields from './components/PostForm';
import Albums from './components/Album';
import ImgGallery from './components/ImgGallery';

import {Context} from './components/Context';

function App() {
  const [getState] = useContext(Context);

  return (
    <>
      <Header/>
      <UserTable/>
      {getState.isPost ? <Posts/> : null}
      {getState.isPostForm ? <ValidationTextFields/> : null}
      {getState.isAlbums ? <Albums/> : null}
      {getState.isSlider ? <ImgGallery/> : null}
    </>
  );
}

export default App;
