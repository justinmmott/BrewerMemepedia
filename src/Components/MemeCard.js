import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner'

import './../css/memecard.css'
import { storage } from './../firebase/firebase';

const MemeCard = (props) => {
    const [picture, setPicture] = useState('');

    useEffect(() => {
        if (!picture) getPicture();
    });

    const getPicture = async () => {
        let picture = await storage.ref().child(`memePictures/${props.meme['image']}`).getDownloadURL();

        setPicture(picture);
    };

    return (
        <div className="card-wrapper">
            <Link to={`/meme?id=${props.meme['id']}`} className="link">
                <div className="card-shadow">
                    <div className="card">
                        {!picture ?
                            <div className="card-loader-wrapper">
                                <Loader type="Oval" color="#69abed" className="loader" />
                            </div>
                            :
                            <img src={picture} alt="Meme" />}
                        <div className="card-desc">
                            <b>{props.meme['name']}</b>
                            <div>{props.meme['tldr']}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );

}

export default MemeCard;