

import React, {useState, useEffect} from 'react';
import './Login.css';

import { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { loginUser, userData} from "../userSlice";

const Login = () => {

    //Hooks
    const [credentials, setCredentials] = useState({email:'',password:''});
    const [msgError, setMsgError] = useState("");

    //Variables 
    let navigate = useNavigate();
    //Dispatch va a ser un método necesario de Redux que vamos a usar
    const dispatch = useDispatch();
    const credenciales = useSelector(userData);

    //Handlers
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }                                      


    //Funciones de estado
    useEffect(()=>{
        //Comprobamos si poseemos token...
        console.log("soy credenciales",credenciales);
        
        if(credenciales?.token !== ''){
            navigate("/");
        };
        // eslint-disable-next-line 
    },[]);

    //Funciones
    const logeame = () => {
        
        //Primero compruebo que los campos sean correctos

            //Esta expresión regular ayuda a validar un email
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email) ) {
            setMsgError('Introduce un e-mail válido');
            return;
        }

            //Esta expresión regular ayuda a validar un password (numero + letras en este caso)
        
        if(credentials.password.length > 4){

            if (! /[\d()+-]/g.test(credentials.password) ) {
            
                setMsgError('Introduce un password válido');
                return;
            };
            
        }else{
            setMsgError('El password debe de tener como mínimo 4 caracteres');
            return;
        }

        //Por si acaso teníamos algo referenciado como error, lo limpiamos
        setMsgError("");

        //Dispatch es el método de redux que ejecuta el reducer
        dispatch(loginUser({email: credentials.email,
            password: credentials.password}
        ));

        setTimeout(()=>{
            navigate("/");
        },1000)

    };

     return (
         <div className='loginDesign'>
            <pre>{JSON.stringify(credentials, null,2)}</pre>
            <input  className="mb2" type='email' name='email' title='email' onChange={updateCredentials} lenght='30'/>
            <input  type='password'  name='password' title='password' onChange={updateCredentials} lenght='30'/>
            <div className="sendButton" onClick={()=>logeame()}>Login</div>
            <div>{msgError}</div>
         </div>
     )
}
export default Login;