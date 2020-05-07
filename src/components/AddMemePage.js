import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db, storage, auth } from './../firebase/firebase';
import './../css/addmemepage.css';


function AddMemePage() {
    const [memeName, setMemeName] = useState('');
    const [memeTLDR, setmemeTLDR] = useState('');
    const [memeDate, setmemeDate] = useState((new Date()).toISOString().substr(0,10));
    const [memeDesc, setmemeDesc] = useState('');
    const [memeImg, setmemeImg] = useState('');

    const handleImageAsFile = (event) => {
        const image = event.target.files[0];
        setmemeImg(image);
    }

    const [user] = useAuthState(auth);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let preQuery = await db.collection("memes").where('name', "==", memeName).get();
        let doesExist = false;
        preQuery.forEach(() => {
            doesExist = true;
        });

        if (!doesExist) {

            let hasImage = !(memeImg === '')

            const imagePath = memeName.toLowerCase().split(' ').join('_');

            if (hasImage) {
                await storage.ref(`memePictures/${imagePath}`).put(memeImg);
            }

            let docRef = await db.collection("memes").add({
                name: memeName,
                tldr: memeTLDR,
                desc: memeDesc,
                submitter: user.uid,
                date: new Date(memeDate),
                image: hasImage ? imagePath : "default",
                visits: 0,
                random: Math.random(),
            });

            window.history.pushState('','',`/meme/${docRef.id}`);
            window.history.go();
        }


    };

    return (
        <div className="meme-builder">
            <form className="meme-form" onSubmit={handleSubmit}>
                <h1>Add a meme to memepedia</h1>
                <div className="meme-input meme-name-input" >
                    <input type="text" placeholder="Name" value={memeName} onChange={(event) => setMemeName(event.target.value)} required />
                </div>
                <div className="meme-input meme-tldr-input" >
                    <input type="text" placeholder="tl;dr" value={memeTLDR} onChange={(event) => setmemeTLDR(event.target.value)} required />
                </div>
                <div className="meme-input meme-date-input" >
                    <input type="date" value={memeDate} onChange={(event) => setmemeDate(event.target.value)} required />
                </div>
                <div className="meme-input meme-desc-input" >
                    <textarea type="text" placeholder="description" value={memeDesc} onChange={(event) => setmemeDesc(event.target.value)} required />
                </div>
                <input type="file" id="img" className="meme-image" accept="image/*" onChange={handleImageAsFile} />
                <input type="submit" className="meme-submit" value="Add Meme" />
            </form>
        </div>
    );

}

export default AddMemePage;

