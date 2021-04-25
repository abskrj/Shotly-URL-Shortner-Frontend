import React, { useEffect, useState } from 'react';
import "./Graphs.css";
import { Bar } from 'react-chartjs-2';

const parseAnalytics = aId => {
    let platform = {};
    let browser = {};
    let os = {};
    let count = 0;
    aId.platform.forEach(data => {
        count++;
        platform[data] = platform[data] ? platform[data] + 1 : 1;
    })
    aId.browser.forEach(data => {
        browser[data] = browser[data] ? browser[data] + 1 : 1;
    })
    aId.os.forEach(data => {
        os[data] = os[data] ? os[data] + 1 : 1;
    })

    return { platform, browser, os, count }
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
    const [totalVisits, setTotalVisits] = useState(null);
    
    useEffect(() => {
        let { platform, browser, os, count } = parseAnalytics(aId);
        setPlatformGraphData(generateGraphData(platform, "Platform"));
        setBrowserGraphData(generateGraphData(browser, "Browser"));
        setOsGraphData(generateGraphData(os, "Operating System"));
        setTotalVisits(count);
    }, [aId]);


    return (
        <div className="graph">

            {totalVisits ? <center> <h3> Total Visits: {totalVisits} </h3></center> : ""}

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
                    {platformGraphData ? <Bar data={platformGraphData} options={{maintainAspectRatio: false}} /> : ""}
                </div>
                <div className="graph__browser">
                    {browserGraphData ? <Bar data={browserGraphData} options={{maintainAspectRatio: false}} /> : ""}
                </div>

                <div className="graph__os">
                    {osGraphData ? <Bar data={osGraphData} options={{maintainAspectRatio: false}} /> : ""}
                </div>
            </div>
        </div>
    )
}
