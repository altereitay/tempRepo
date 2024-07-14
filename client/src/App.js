import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./components/Login/Login";
import HomePage from "./components/Home/Home";
import Map from "./components/Map/Map"
import CitizenReports from "./components/Reports/CitizenReports";
import EditProfile from "./components/EditProfile/EditProfile";
import Register from "./components/Register/Register";

function App() {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/map" element={<Map/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/Home" element={<HomePage/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path='/editProfile' element={<EditProfile/>}/>
                <Route path='/reports' element={<CitizenReports/>}/>
            </Routes>
        </Router>
    );
}

export default App;
