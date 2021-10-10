import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { addToPlayList } from '../features/audioSlice';
import { addFiles } from '../features/fileSlice';

const formatData = (files) => {
    let data = [];
    files.forEach(file => {

        const fileDocument = {
            name: file.name,
            type: file.type ? file.type : 'NA',
            size: file.size,
            lastModified: file.lastModified,
            localUrl: URL.createObjectURL(file)
        }
        data.push(fileDocument);
    })
    return data;
}

export default function FileLoader() {
    const [filenameList, setFilenamesList] = useState(['Please Upload Your Audio'])
    const audioInput = useRef(null);
    const dispatch = useDispatch();

    const handleUpload = () => {
        const currentFiles = audioInput.current.files;

        // Read files for their file names
        let fileNames = Array.from(currentFiles).map(file => file.name)
        setFilenamesList(fileNames)

        // Read files and create binary string
        let newAudioElements = Array.from(currentFiles).map(file => {
            let newAudioTrack = URL.createObjectURL(file);
            return newAudioTrack;
        })
        dispatch(addToPlayList(newAudioElements))

        // Read files and create meta objects
        dispatch(addFiles(formatData(Array.from(currentFiles))));
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