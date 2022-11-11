import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {ToastContainer} from "react-toastify";
import Registration from "./pages/Registration";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/user/:friendId" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer closeOnClick hideProgressBar/>
        </>
    );
}

export default App;
