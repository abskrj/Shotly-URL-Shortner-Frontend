import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import axios from "axios";
import Graphs from '../Graphs/Graphs';
import "./Analytics.css";

export default function Analytics() {
    const [analyticsId, setAnalyticsId] = useState(null);
    const [analytics, setAnalytics] = useState();
    const { addToast } = useToasts();

    const fetchAnalytics = async () => {
        try {
            let resp = await axios.get(`https://codedoc.tech/api/v1/analytics?uId=${analyticsId}`, { timeout: 4000 });
            if (resp && resp.status === 200) {
                setAnalytics(resp.data);
                let allIDs = localStorage.getItem("aIds");
                if (!allIDs) {
                    localStorage.setItem("aIds", analyticsId);
                } else {
                    allIDs = allIDs.split(',');
                    if (allIDs.indexOf(analyticsId) === -1) {
                        localStorage.setItem("aIds", `${allIDs},${analyticsId}`);
                    }
                }
            }
        } catch {
            addToast("0 Visits OR Invalid Analytics ID", {
                appearance: "info",
                autoDismiss: true,
            });
        }

    }

    return (
        <div className="analytics__main">
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Analytics ID"
                    aria-label="Analytics ID"
                    aria-describedby="basic-addon2"
                    onChange={e => setAnalyticsId(e.target.value)}
                />
                <InputGroup.Append>
                    <Button disabled={!analyticsId} value={analyticsId} onClick={fetchAnalytics} variant="outline-dark">Search</Button>
                </InputGroup.Append>
            </InputGroup>
            {analytics ? <Graphs aId={analytics} /> : ""}
        </div>
    )
}
