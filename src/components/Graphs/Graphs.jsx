import React from 'react';
import "./Graphs.css";
import { Bar } from 'react-chartjs-2';

const parseAnalytics = aId => {
    let platform = {};
    let browser = {};
    let os = {};
    aId.map(data => {
        if (freq[data])
    })
}

export default function Graphs({ aId }) {
    
    return (
        <div>
            <Bar />
        </div>
    )
}
