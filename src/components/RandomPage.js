import React, { useState, useEffect } from 'react';
import { navigate } from "hookrouter";
import Loader from 'react-loader-spinner'

import { db } from './../firebase/firebase';


const RandomPage = () => {
    const [memeID, setMemeID] = useState('');

    useEffect(() => {
        const random = Math.random();
        if (!memeID) getMemeID(random, 'less');
    });

    const getMemeID = async (random, condition) => {
        let query = await db.collection('memes').where('random', condition === 'less' ? '<=' : '>=', random).orderBy('random', "desc").limit(1).get();
        let docID;
        query.forEach((doc) => {
            docID = doc.id;
        });
        if (!docID) {
            getMemeID(random, 'greater');
            return;
        }
        setMemeID(docID);
        navigate(`/meme/${docID}`, true);
    };

    return (
        <div className="loader-wrapper">
            <Loader type="Oval" color="#69abed" className="loader" />
        </div>
    );

}

export default RandomPage;

