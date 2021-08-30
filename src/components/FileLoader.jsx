import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
import { addToPlayList } from '../features/audioSlice';
import '../assets/styles/fileloader.css';

export default function FileLoader() {
    // const playlist = useSelector((state) => state.audio.audioPlayList)
    const [files, setFiles] = useState([]);
    const [filenameList, setFilenamesList] = useState(['Please Upload Your Audio'])
    const audioInput = useRef(null);
    const dispatch = useDispatch();


    const handleUpload = () => {
        const currentFiles = audioInput.current.files;
        setFiles(currentFiles)
        let fileNames = Array.from(currentFiles);
        fileNames = fileNames.map(file => file.name)
        setFilenamesList(fileNames)
        dispatch(addToPlayList(currentFiles))
    }

    return (
        <div className="uploader__wrapper">
            <button className="uploader__button">Upload a file</button>
            <input
                ref={audioInput}
                type="file"
                multiple
                onInput={handleUpload} />
            <sub>{filenameList.map((filename, index) => <div key={index}>{filename}</div>)}</sub>
        </div>
    )
}