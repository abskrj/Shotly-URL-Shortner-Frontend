import React, { useCallback, useRef, useState } from 'react';
import "./CloudStorage.css";

import AWS from 'aws-sdk';
import { useDropzone } from 'react-dropzone'
import FileInfo from '../FileInfo/FileInfo';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import Slider from '../Slider/Slider';

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;
const REGION = process.env.REACT_APP_REGION;

AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});

const bucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

function makeid(length = 8) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

export default function CloudStorage() {
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const { addToast } = useToasts();
    const [URLdata, setURLdata] = useState({ shortedUrl: '', analyticsId: '' });
    const shortedEl = useRef(null);
    const analyticsEl = useRef(null);

    const uploadFile = () => {
        const file = selectedFile;
        if ((file.size / 1000000) > 100) {
            addToast("File Larger than 100 MB", {
                appearance: "error",
                autoDismiss: true,
            });
            return;
        }
        const fileName = makeid();
        let ext = file.name.split('.');
        ext = ext[ext.length-1];
        axios
            .post(
                "https://sotly.co/api/v1/shorten",
                {
                    urlReceived: "https://app.sotly.co/f/" + fileName + "-" + encodeURI(file.name),
                    urlCode: fileName,
                    isFile: true,
                },
                { headers: { "Content-Type": "application/json" } }
            )
            .then((res) => {
                if (res.data.statusCode === 200) {

                    addToast("URL Generated", {
                        appearance: "success",
                        autoDismiss: true,
                    });


                    setURLdata({
                        shortedUrl: `https://sotly.co/${fileName}`,
                        analyticsId: res.data.urlID
                    });
                    let allIDs = localStorage.getItem("aIds");
                    if (!allIDs) {
                        localStorage.setItem("aIds", res.data.urlID);
                    } else {
                        allIDs = allIDs.split(',');
                        localStorage.setItem("aIds", `${allIDs},${res.data.urlID}`);
                    }
                }

                else if (res.data.statusCode === 400) {
                    addToast(res.data.statusTxt, {
                        appearance: "warning",
                        autoDismiss: true,
                    });
                    setURLdata({ shortedUrl: '', analyticsId: '' });
                    return;
                }
                else {
                    addToast(res.data.statusTxt, {
                        appearance: "error",
                        autoDismiss: true,
                    });
                    setURLdata({ shortedUrl: '', analyticsId: '' });
                    return;
                }
            })
            .catch((res) => {
                if (res) {
                    addToast("Something Went Wrong", {
                        appearance: "error",
                        autoDismiss: true,
                    });
                    return;
                }

            });

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: 'files/' + fileName
        };

        bucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err);
            });
    };

    const onDrop = useCallback(acceptedFiles => {
        setSelectedFile(acceptedFiles[0]);
        setProgress(0);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const copyShortedUrl = e => {
        if (!URLdata.shortedUrl) return;
        shortedEl.current.select();
        document.execCommand("copy");
        e.target.focus();
        addToast("Shorted URL Copied", {
            appearance: "success",
            autoDismiss: true,
        });
    };

    const copyAnalyticsID = e => {
        if (!URLdata.analyticsId) return;
        analyticsEl.current.select();
        document.execCommand("copy");
        e.target.focus();
        addToast("Analytics ID Copied", {
            appearance: "success",
            autoDismiss: true,
        });
    }

    return (
        <>
        <Slider checked />
        <div className="cs">
            <div className="cloudStorage">
                <center>
                    <div className="cs__dropzone" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Select File or Drop File here(max 100MB)</p>
                        }
                    </div>
                </center>

                <center>
                    {selectedFile ? <FileInfo data={selectedFile} /> : ""}
                </center>

                <center>
                    <button disabled={!selectedFile || progress > 0 ? true : false} onClick={uploadFile} className="cs__uploadBtn"> {progress !== 0 && progress !== 100 ? "UPLOADING... " + progress + "%" : progress === 100 ? "UPLOADED ✅" : "UPLOAD"}</button>
                </center>

            </div>

            <div className="cs_info">
                <center>
                    <h6>Click to Copy</h6>
                </center>
                <div>
                    <label htmlFor="shortedUrl">Shorted URL</label>
                    <input onClick={copyShortedUrl} ref={shortedEl} value={URLdata.shortedUrl} readOnly id="shortedUrl" type="text" />
                </div>

                <div>
                    <label htmlFor="analyticsId">Analytics ID</label>
                    <input onClick={copyAnalyticsID} ref={analyticsEl} value={URLdata.analyticsId} readOnly id="analyticsId" type="text" />
                </div>
            </div>

        </div>
        </>

    )
}
