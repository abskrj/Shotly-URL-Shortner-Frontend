import React from 'react';
import { Route, Switch } from 'react-router';

import ShortForm from './components/ShortForm';
const About = React.lazy(() => import("./components/About/About"));
const Terms = React.lazy(() => import("./components/Terms/Terms"));
const Analytics = React.lazy(() => import("./components/Analytics/Analytics"));

export default function Routes() {
    return (
        <>
            <Switch>

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
        </>
    )
}
