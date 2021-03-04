import React, { useEffect, useState } from 'react';
import "./Graphs.css";
import { Bar } from 'react-chartjs-2';

const parseAnalytics = aId => {
    let platform = {};
    let browser = {};
    let os = {};
    aId.platform.map(data => {
        platform[data] = platform[data] ? platform[data] + 1 : 1;
    })
    aId.browser.map(data => {
        browser[data] = browser[data] ? browser[data] + 1 : 1;
    })
    aId.os.map(data => {
        os[data] = os[data] ? os[data] + 1 : 1;
    })

    return { platform, browser, os }
}

const generateGraphData = (data, type) => {
    const state = {
        labels: Object.keys(data),
        datasets: [
            {
                label: type,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: Object.values(data)
            }
        ]
    }

    return state;
}

export default function Graphs({ aId }) {
    const [platformGraphData, setPlatformGraphData] = useState(null);
    const [browserGraphData, setBrowserGraphData] = useState(null);
    const [osGraphData, setOsGraphData] = useState(null);
    let { platform, browser, os } = parseAnalytics(aId);

    useEffect(() => {
        setPlatformGraphData(generateGraphData(platform, "Platform"));
        setBrowserGraphData(generateGraphData(browser, "Browser"));
        setOsGraphData(generateGraphData(os, "Operating System"));
    }, []);


    return (
        <div className="graph__main">
            <div className="graph__ip">
                <center>IP Addresses</center>
                <ul>
                    {
                        aId.ip.map(data => <li key={data} >{data}</li>)
                    }
                </ul>
            </div>
            <div className="graph__platform">
                {platformGraphData ? <Bar data={platformGraphData} /> : ""}
            </div>
            <div className="graph__browser">
                {browserGraphData ? <Bar data={browserGraphData} /> : ""}
            </div>

            <div className="graph__os">
                {osGraphData ? <Bar data={osGraphData} /> : ""}
            </div>
        </div>
    )
}
