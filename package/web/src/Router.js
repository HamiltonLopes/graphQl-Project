import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import  ClientList  from './pages/components/ClientList';

import Home from './pages/home/Home';
import Login from './pages/login/Login';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/clientList" element={<ClientList/>} />
            </Routes>
        </BrowserRouter>
    );
}