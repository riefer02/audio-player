import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
import { addToPlayList } from '../features/audioSlice';

export default function FileLoader() {
    // const playlist = useSelector((state) => state.audio.audioPlayList)
    const [files, setFiles] = useState([]);
    const [filenameList, setFilenamesList] = useState(['Please Upload Your Audio'])
    const audioInput = useRef(null);
    const dispatch = useDispatch();


    const handleUpload = () => {
        const currentFiles = audioInput.current.files;
        console.log(currentFiles)
        setFiles(currentFiles)

        let fileNames = Array.from(currentFiles);
        fileNames = fileNames.map(file => file.name)
        setFilenamesList(fileNames)

        let newAudioElements = Array.from(currentFiles);
        newAudioElements = newAudioElements.map(file => {
            let newAudioTrack = URL.createObjectURL(file);
            newAudioTrack = new Audio(newAudioTrack);
            return newAudioTrack;
        })

        dispatch(addToPlayList(newAudioElements))
    }

    return (
        <div className="uploader__wrapper">
            <button className="uploader__button">Upload a file</button>
            <input
                className="uploader__input"
                ref={audioInput}
                type="file"
                multiple
                onInput={handleUpload} />
            <div className="uploader__file-list">
                {filenameList.map((filename, index) =>
                    <div className="uploader__file-item" key={index}>{filename}</div>
                )}
            </div>
        </div>
    )
}