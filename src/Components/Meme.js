import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner'

import { db, storage } from './../firebase/firebase';
import './../css/meme.css';

const Meme = (props) => {
    const [meme, setMeme] = useState('');
    const [memePicture, setMemePicture] = useState('');
    const [memeDate, setMemeDate] = useState('');

    useEffect(() => {
        if (!meme) getMeme();
    });

    const getMeme = async () => {
        let query = await db.collection('memes').doc(props.meme).get();
        query = query.data();
        let picture = await storage.ref().child(`memePictures/${query['image']}`).getDownloadURL();

        let date = query['date'].toDate().toDateString();

        setMeme(query);
        setMemeDate(date)
        setMemePicture(picture);
    };

    return (
        !memePicture ?
            <div className="loader-wrapper">
                <Loader type="Oval" color="#69abed" className="loader"/>
            </div>
            :
            <div className="memePage">
                <div className="memeNameWrapper">
                    <div className="memeName">
                        {meme['name']}
                    </div>
                </div>
                <div className="desc">
                    <p>
                        <b>
                            {meme['name']}
                        </b>
                        {` (created on ${memeDate}): ${meme['desc']}`}
                    </p>
                </div>
                <figure className="memeImage">
                    <img src={memePicture} alt="Meme" className="image" />
                    <figcaption>{meme['tldr']}</figcaption>
                </figure>
            </div >
    );
}

export default Meme;