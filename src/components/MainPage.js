import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner'

import MemeCard from './MemeCard';
import { db } from './../firebase/firebase';
import './../css/mainpage.css';

const MainPage = () => {
    const [memes, setMemes] = useState([]);
    const [search, setSearch] = useState('');
    const [gotNoMemes, setGotNoMemes] = useState(false);

    useEffect(() => {
        if (search.length === 0) getMemesInit();
    }, [search]);

    const getMemesInit = async () => {
        let query = await db.collection('memes').orderBy('visits', "desc").limit(10).get();
        query.forEach((doc) => {
            setMemes(memes => [...memes, doc]);
        });
    };

    const getMemesSearch = async (searchQuery) => {
        setSearch(searchQuery);
        let query = await db.collection('memes').where("searchStrings", "array-contains", searchQuery.toLowerCase()).limit(10).get();
        let temp = []
        let hasMemes = false;
        query.forEach((doc) => {
            hasMemes = true;
            temp.push(doc);
        });
        if (!hasMemes || searchQuery.length === 0) setGotNoMemes(true);
        setMemes(temp);
    };

    return (
        <React.Fragment>
            <div className="search-wrapper">
                <div className="search-input" >
                    <div className="fas fa-search search-icon"></div>
                    <input id="search-bar" type="text" value={search} onChange={(event) => getMemesSearch(event.target.value)} />
                </div>
            </div>
            {memes.length === 0 ?
                gotNoMemes ?
                    <div className="loader-wrapper">
                        No results
                    </div>
                    :
                    <div className="loader-wrapper">
                        <Loader type="Oval" color="#69abed" className="loader" />
                    </div>
                :
                <div className="cards">
                    {memes.map(function (doc) {
                        return <MemeCard meme={doc.data()} id={doc.id} key={doc.id} />
                    })}
                </div>
            }
        </React.Fragment>
    );
}

export default MainPage;