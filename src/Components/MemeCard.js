import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import './../css/memecard.css'
import { storage } from './../firebase/firebase';

const MemeCard = (props) => {
    const [picture, setPicture] = useState('');

    useEffect(() => {
        if (!picture) getPicture();
    });

    const getPicture = async () => {
        console.log(props.meme['image']);
        let picture = await storage.ref().child(`memePictures/${props.meme['image']}`).getDownloadURL();

        setPicture(picture);
    };

    return (
        <div className="card-wrapper">
            <Link to={`/meme?id=${props.meme['id']}`} className="link">
                <div className="card-shadow">
                    <div className="card">
                        <div className="card-img">
                            <img src={picture} alt="Meme" />
                        </div>
                        <div className="card-desc">
                            <h4><b>{props.meme['name']}</b></h4>
                            <p>{props.meme['tldr']}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );

}

export default MemeCard;