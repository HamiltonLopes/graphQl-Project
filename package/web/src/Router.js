import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from './pages/home/Home';
import SignIn from './pages/login/Signin';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    );
}