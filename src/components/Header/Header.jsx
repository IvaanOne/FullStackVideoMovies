

import React, {useState} from 'react';
import './Header.css';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userData, logOut } from '../../containers/User/userSlice';
import { searchFilm } from './searchSlice';

const Header = () => {

    const [criterio, setCriterio] = useState("");

    //Variable
    const credenciales = useSelector(userData);

    //Esto no es un hook, es simplemente una variable "normal"

    let navegador = useNavigate();
    const dispatch = useDispatch();

    //Handlers
    const busca = (e) => {
        
        //Aqui procedemos a llamar a la funcion axios que tenemos en el slice de redux que es quien 
        //va buscando las películas en el backend
        dispatch(searchFilm(e.target.value));
    }

    const viajar = (destino) => {
        navegador(destino)
    };

    if(!credenciales?.user_role){

        return (
            <div className='headerDesign'>
                <div className='textLink'>

                    <input  type='text' name='criterio' title='Busca una pelicula...' onChange={busca} lenght='30'/>

                </div>
                <div className='textLink' onClick={()=>viajar("/login")}>Login</div>
                <div className='textLink' onClick={()=>viajar("/register")}>Register</div>
            </div>
        )


    }else {

        return (
            <div className='headerDesign'>
                <div className='textLink' onClick={()=>viajar("/profile")}>{credenciales?.user_name}</div>
                <div className='textLink' onClick={()=>dispatch(logOut())}>log out</div>
            </div>
        )

    }  

};

export default Header;