import React from 'react';

import MainPage from './components/MainPage';
import RandomPage from './components/RandomPage';
import AddMemePage from './components/AddMemePage'
import Meme from './components/Meme';

const routes = {
    "/addMeme": () => <AddMemePage />,
    "/meme/:id": ({ id }) => <Meme memeID={id} />,
    "/random": () =>  <RandomPage />,
     "/": () => <MainPage />,
};

export default routes;