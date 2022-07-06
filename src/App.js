

import './Global.scss';
import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


//Importación de componentes y containers

import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import Login from './containers/User/Login/Login';
import Register from './containers/User/Register/Register';
import Profile from './containers/User/Profile/Profile';
import FilmDetail from './containers/FilmDetail/FilmDetail';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>

        <Header/>
      
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/detail" element={<FilmDetail/>}/>

        </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
