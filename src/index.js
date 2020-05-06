import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
const apiURL =
    'https://europe-west1-thomasmaclean.cloudfunctions.net/getSetBuildFail';
const App = () => {
    const [buildFailed, buildFailedSet] = useState(false);
    useEffect(() => {
        fetch(apiURL)
            .then((x) => x.json())
            .then((data) => {
                console.log(data);
                buildFailedSet(data.buildFailed);
            });
    }, []);

    const fixBuild = () => {
        const token =
            localStorage.getItem('auth-token') || prompt('give token');

        localStorage.setItem('auth-token', token);

        fetch(apiURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, failed: false }),
        })
            .then((x) => x.json())
            .then((y) => {
                buildFailedSet(y.data.value);
            });
    };

    const breakBuild = () => {
        const token =
            localStorage.getItem('auth-token') || prompt('give token');

        localStorage.setItem('auth-token', token);

        fetch(apiURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, failed: true }),
        })
            .then((x) => x.json())
            .then((y) => {
                buildFailedSet(y.data.value);
            });
    };
    return (
        <main>
            <h1>Cloudbuild watcher</h1>

            <a
                href="https://console.cloud.google.com/cloud-build/builds?authuser=2&project=thomasmaclean"
                target="_blank"
            >
                google cloud console
            </a>

            {buildFailed ? (
                <div className="bad">
                    Build is failing
                    <button onClick={fixBuild}>fix it</button>
                </div>
            ) : (
                <div className="good">
                    All is good
                    <button onClick={breakBuild}>break it</button>
                </div>
            )}

            <video
             
                autoPlay
                src="https://files.thomasmaclean.be/file/thomasmacleanbucket/demo.mp4"
            ></video>
        </main>
    );
};

ReactDOM.render(
    React.createElement(App, {}, null),
    document.getElementById('react-inject')
);
