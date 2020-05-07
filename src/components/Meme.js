import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Markdown from 'react-markdown';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import { db, storage } from './../firebase/firebase';
import './../css/meme.css';

const Meme = (props) => {
    const [meme, setMeme] = useState('');
    const [memePicture, setMemePicture] = useState('');
    const [memeDate, setMemeDate] = useState('');
    const [edit, setEdit] = useState(false);
    const [desc, setDesc] = useState('');
    const [name, setName] = useState('');
    const [tldr, setTldr] = useState('');

    useEffect(() => {
        if (!meme) getMeme();

        window.onpopstate = () => {
            setMeme('');
            setMemePicture('');
        };
    });

    const getMeme = async () => {
        let docRef = db.collection('memes').doc(props.memeID);
        let query = await docRef.get();
        query = query.data();
        setMeme(query);

        let picture = await storage.ref().child(`memePictures/${query['image']}`).getDownloadURL();

        let date = query['date'].toDate().toDateString();

        setMemeDate(date)
        setDesc(query['desc']);
        setName(query['name']);
        setTldr(query['tldr']);
        setMemePicture(picture);

        await docRef.update({
            "visits": query['visits'] + 1,
        });
    };

    const addDescChanges = async () => {
        let docRef = db.collection('memes').doc(props.memeID);

        await docRef.update({
            "name": name,
            "desc": desc,
            "tldr": tldr,
        });

        setEdit(false);
    };

    return (
        !memePicture ?
            <div className="loader-wrapper">
                <Loader type="Oval" color="#69abed" className="loader" />
            </div>
            :
            edit ?
                <React.Fragment>
                    <MdEditor
                        value={desc}
                        renderHTML={(text) => <Markdown source={text} />}
                        style={{ height: "50vh", zIndex: -1 }}
                        onChange={({ text }) => setDesc(text)}
                    />
                    <div className="edit-input" >
                        Name
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="edit-input" >
                        TL;DR
                        <input type="text" value={tldr} onChange={(event) => setTldr(event.target.value)} />
                    </div>

                    <div className="edit-buttons">
                        <div onClick={() => addDescChanges()} className="submit-edits"> <h4>Submit</h4> </div>
                        <div onClick={() => setEdit(false)} className="cancel-edits"> <h4>Cancel</h4> </div>
                    </div>
                </React.Fragment>
                :
                <div className="memePage">
                    <div className="memeNameWrapper">
                        <div className="memeName">
                            {meme['name']}
                        </div>
                        <div className="memeEdit" onClick={() => setEdit(true)}>
                            <div className="fas fa-edit " />
                        </div>
                    </div>
                    <div className="desc">
                        <b>
                            {name}
                        </b>

                        {` (created on ${memeDate}): `}
                        <Markdown source={desc} />
                    </div>
                    <figure className="memeImage">
                        <img src={memePicture} alt="Meme" className="image" />
                        <figcaption>{tldr}</figcaption>
                    </figure>
                </div >
    );
}

export default Meme;