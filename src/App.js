

import './Global.scss';
import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


//Importación de componentes y containers
import * as bootstrap from 'bootstrap';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import Login from './containers/User/Login/Login';
import Register from './containers/User/Register/Register';
import Profile from './containers/User/Profile/Profile';
import Admin from './containers/User/Admin/Admin'
import FilmDetail from './containers/FilmDetail/FilmDetail';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { searchContext } from "./components/Header/Header";
import { useState } from "react"

function App() {
  const [searcher, setSearcher] = useState("cabezon");

  return (
    <searchContext.Provider value={[searcher, setSearcher]}>
    <div className="App">
      
      <BrowserRouter>

        <Header/>
      
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path= '/admin' element= {<Admin/>}/>
          <Route path="/detail" element={<FilmDetail/>}/>

        </Routes>
      
      </BrowserRouter>

    </div>
    </searchContext.Provider >
  );
}

export default App;
