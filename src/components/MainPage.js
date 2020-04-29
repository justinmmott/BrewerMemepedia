import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Loader from 'react-loader-spinner'

import MemeCard from './MemeCard';
import Meme from './Meme';
import { db } from './../firebase/firebase';
import './../css/mainpage.css';

const MainPage = () => {
    const [memes, setMemes] = useState([]);
    const [memeId, setMemeId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (memes.length === 0) getMemes();

        window.onpopstate = () => {
            setLoading(true);
            setMemeId('');
        };
    }, [memes]);

    const getMemes = async () => {
        let query = await db.collection('memes').orderBy('visits', "desc").limit(18).get();
        query.forEach((doc) => {
            setMemes(memes => [...memes, doc]);
        });
    };

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const useMemeId = async () => {
        let id = useQuery().get("id");

        if(!loading) return;

        if (!id) {
            setLoading(false);
            return;
        }

        let doc = await db.collection("memes").doc(id).get();

        if (doc.exists) {
            setMemeId(id);
            setLoading(false);
        }
    }

    useMemeId();
    return (
        loading ?
            <div className="loader-wrapper">
                <Loader type="Oval" color="#69abed" className="loader" />
            </div>
            :
            memeId ?
                <Meme meme={memeId} />
                :
                <div className="cards">
                    {memes.map(function (doc) {
                        return <MemeCard meme={doc.data()} id={doc.id} loader={setLoading} key={doc.id} />
                    })}
                </div>
    );
}

export default MainPage;