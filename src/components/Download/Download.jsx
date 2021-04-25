import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import Slider from '../Slider/Slider';

import "./Download.css";

export default function Download() {
    const { fileId } = useParams();
    const _fileId = fileId.split('-');
    const shortCode = _fileId.shift();
    const fileName = decodeURI(_fileId.join());


    const [progress, setProgress] = useState(0);

    const downloadFile = () => {
        axios.request({
            method: "get",
            url: 'https://cdn-firestream.s3.ap-south-1.amazonaws.com/files/' + shortCode,
            onDownloadProgress: (p) => {
                setProgress((p.loaded / p.total) * 100);
            }
        }).then(response => {
            const file = new File([response.data], fileName);
            let url = window.URL.createObjectURL(file);
            let a = document.createElement('a');
            a.href = url;
            a.download = fileId;
            a.click();
        });
    }

    return (
        <div>
            <Slider />
            <center className="download">
                <h2>Click on the Download Link</h2>
                <button className="downloadBtn" onClick={downloadFile} disabled={progress > 0 ? true : false}> {progress !== 0 && progress !== 100 ? "DOWNLOADING... " + progress + "%" : progress === 100 ? "DOWNLOADED ✅" : "DOWNLOAD"}</button>
                <h1>Download the file before we put ads on this page ;)</h1>
            </center>
            <center> Shoutout to me for the progress bar xD</center>
        </div>
    )
}
