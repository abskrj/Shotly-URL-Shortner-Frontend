import React from 'react';
import { Route, Switch } from 'react-router';
import CloudStorage from './components/CloudStorage/CloudStorage';
import Download from './components/Download/Download';

import ShortForm from './components/ShortForm';
const About = React.lazy(() => import("./components/About/About"));
const Terms = React.lazy(() => import("./components/Terms/Terms"));
const Analytics = React.lazy(() => import("./components/Analytics/Analytics"));

export default function Routes() {
    return (
        <Switch>

            <Route path="/f/:fileId">
                <Download />
            </Route>

            <Route path="/upload">
                <CloudStorage />
                <div className="upload_footer">
                    <p>Warning: Don't share sensitive files, files are not encrypted | </p>
                    <p>&nbsp;Files are stored for 1 month</p>
                </div>
            </Route>

            <Route path="/analytics">
                <Analytics />
            </Route>

            <Route path="/terms">
                <Terms />
            </Route>

            <Route path="/about">
                <About />
            </Route>

            <Route path="/">
                <ShortForm />
            </Route>
        </Switch>
    )
}
