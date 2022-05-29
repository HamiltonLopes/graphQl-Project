import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import  ClientList  from './pages/ClientList/ClientList';
import CreateClient from './pages/Registration/CreateClient';

import Home from './pages/home/Home';
import Login from './pages/login/Login';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/clientList" element={<ClientList/>} />
                <Route path='/createclient' element={<CreateClient/>} />
            </Routes>
        </BrowserRouter>
    );
}