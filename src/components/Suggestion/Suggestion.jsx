import React from 'react';
import "./Suggestion.css";

export default function Suggestion({inputId, analyticsIDs}) {
    return (
        <datalist id={inputId}>
            {
                analyticsIDs.map(data => <option key={data} value={data} />)
            }
        </datalist>
    )
}
