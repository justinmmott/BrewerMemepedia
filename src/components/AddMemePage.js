import React, { useState, useEffect } from 'react';

import { db } from './../firebase/firebase';
import './../css/addmemepage.css';


const AddMemePage = () => {
    return (
        <div className="meme-builder">
            <form className="meme-form">
                <h1>Add a meme to memepedia</h1>
                <div className="meme-input" >
                    <input type="text" />
                </div>
                <div className="meme-input" >
                    <input type="text" />
                </div>
                <div className="meme-input" >
                    <input type="text" />
                </div>
                <input type="submit" className="" value="Add Meme" />
            </form>
        </div>
    );

}

export default AddMemePage;

