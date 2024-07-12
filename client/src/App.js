import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./components/Login/Login";
import HomePage from "./components/Home/Home";
import Map from "./components/Map/Map"

function App() {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/Map" element={<Map/>}/>
                <Route path="/Home" element={<HomePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
