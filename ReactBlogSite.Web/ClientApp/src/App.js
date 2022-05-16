import React from 'react';
import Layout from './Layout';
import HomePage from './Pages/HomePage';
import Admin from './Pages/Admin';
import ViewBlog from './Pages/ViewBlog';
import MostRecent from './Pages/MostRecent';
import { Route } from 'react-router-dom';

export default function App() {
    return (
        <Layout>
            <Route exact path='/page/:pageNumber' component={HomePage} />
            <Route exact path='/' component={HomePage} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/viewblog/:postId' component={ViewBlog} /> 
            <Route exact path='/mostrecent' component={MostRecent} /> 
        </Layout>
    )
}

