import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import MemeCard from './MemeCard';
import Meme from './Meme';
import { db } from './../firebase/firebase';
import './../css/mainpage.css';

const MainPage = () => {
    const [memes, setMemes] = useState([]);

    useEffect(() => {
        if (memes.length === 0) getMemes();
    });

    const getMemes = async () => {
        let query = await db.collection('memes').orderBy('visits', "desc").limit(3).get();
        query.forEach((doc) => {
            setMemes(memes => [...memes, doc.data()]);
        });
    };

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let memeID = useQuery().get("id");
    return (
        memeID ?
            <Meme meme={memeID} />
            :
            <div className="cards">
                {memes.map(function (doc) {
                    return <MemeCard meme={doc} key={doc['name']} />
                })}
            </div>

    );
}

export default MainPage;