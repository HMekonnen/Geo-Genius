import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Map from './components/Map';
import Data from './components/Data';



function App() {

  return (
    <div>


<Routes>

<Route path="/" element ={< Home />}/>

</Routes>

    </div>

  );
}

export default App;
