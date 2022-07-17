

import React, { useState, useEffect } from 'react';
import './Login.scss';
import * as bootstrap from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { loginUser, userData } from "../userSlice";

const Login = () => {

    //Hooks
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [msgError, setMsgError] = useState("");

    //Variables 
    let navegador = useNavigate();
    //Dispatch va a ser un método necesario de Redux que vamos a usar
    const dispatch = useDispatch();
    const credenciales = useSelector(userData);

    //Handlers
    const updateCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value})
    }


    //Funciones de estado
    useEffect(() => {
        //Comprobamos si poseemos token...
        console.log("soy credenciales", credenciales);
        
        if (credenciales?.token !== '') {
            navegador("/register");
        };
    }, []);
    
    //Funciones
    const logeame = () => {
        
        console.log("esoty aqui");
        console.log(credentials);
        //Primero compruebo que los campos sean correctos

        //Esta expresión regular ayuda a validar un email
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email)) {
            setMsgError('Introduce un e-mail válido');
            
        }

        //Esta expresión regular ayuda a validar un password (numero + letras en este caso)

        if (credentials.password.length > 4) {

            if (! /[\d()+-]/g.test(credentials.password)) {

                setMsgError('Introduce un password válido');
                return;
            };

        } else {
            setMsgError('El password debe de tener como mínimo 4 caracteres');
            return;
        }


        //Por si acaso teníamos algo referenciado como error, lo limpiamos
        

        //Dispatch es el método de redux que ejecuta el reducer
        dispatch(loginUser({email: credentials.email,
            password: credentials.password}
        ));
        
        setTimeout(() => {
            navegador("/");
        }, 1000)
    };

    return (
        <html>
            <body class="main-bg">
                <div class="login-container text-c animated flipInX">
                    <div>
                        <h1 class="logo-badge text-whitesmoke"><span class="fa fa-user-circle"></span></h1>
                    </div>
                    <h3 class="text-whitesmoke">Bienvenido de nuevo!</h3>
                    <p class="text-whitesmoke">Login</p>
                    <div class="container-content">
                        <form class="margin-t">
                            <div class="form-group">
                                <input type="email" class="form-control" name='email' title='email' placeholder="email" onChange={updateCredentials}></input>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" name='password' title='password' placeholder="*****"  onChange={updateCredentials}></input>
                            </div>        
                            <a class="text-darkyellow" ><small>Has olvidado tu contraseña?</small></a>
                            <p class="text-whitesmoke text-center"><small>No tienes cuenta?</small></p>
                            <a class="text-darkyellow" ><small>Regístrate</small></a>
                        </form>
                        <button type="submit" class="form-button button-l margin-b" onClick={()=>logeame()}>Login</button>
                        <p class="margin-t text-whitesmoke"><small> {msgError} </small> </p>
                    </div>
                </div>
            </body>
        </html>
    )
}
export default Login;