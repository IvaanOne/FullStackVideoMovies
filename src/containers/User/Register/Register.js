

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Register = (props) => {

    //Hooks

    const [datosUser, setDatosUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        password2: "",
        phone: "",
        adress: "",
        city: "",
        birth: ""
    });

    const [msgError, setMsgError] = useState("");
    const [congratulations, setCongratulations] = useState("");

    //Variables
    let navigate = useNavigate();

    //Handlers
    const updateUserData = (e) => {
        setDatosUser({ ...datosUser, [e.target.name]: e.target.value })
    }

    //Funciones del componente (useEffect)

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        
    })

    //Funciones
    const Registrame = async () => {

        let mandatory = ['name', 'surname', 'email', 'password', 'password2', 'phone', 'adress', 'city', 'birth'];

        for (let field of mandatory) {
            if (datosUser[field] === '') {
                setMsgError(`Te ha faltado ${[field]} por rellenar`);
                return;
            }
        }

        //Con esto válidamos que el email este correctamente.
        if (!datosUser.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
            setMsgError('introduce un email válido!');
            return;
        }

        //Comprobamos que el password esté repetido correctamente

        if (datosUser.password !== datosUser.password2) {
            setMsgError("Los dos password deben de coincidir");
            return;
        }

        //La pasword tiene que ser de un tamaño especificado, en este caso entre 6 y 10 digitos.
        if (datosUser.password.length < 6 || datosUser.password.length > 10) {

            setMsgError("La password tiene que ser entre 6 y 10 digitos");
            return;
        }
        
        
        //axios....comunicamos con el backend
        let resultado = await axios.post("https://proyecto-bucador-peliculas.herokuapp.com/api/register",datosUser);

        if(resultado.status === 200){
                setCongratulations(true);

            setTimeout(() => {
            navigate("/login");
            }, 2000);
        }
        
    }


    if (congratulations === true) {

        return (
            <div className="registerDesign">
                Bienvenido a nuestra aplicación, {datosUser.name}
            </div>
        )

    } else {
        return (
            <html>
                <body class="main-bg">
                    <div class="login-container text-c animated flipInX">
                        <div>
                            <h1 class="logo-badge text-whitesmoke"><span class="fa fa-user-circle"></span></h1>
                        </div>
                        <h3 class="text-whitesmoke">Regístrate en nuestra web!</h3>
                        <p class="text-whitesmoke"></p>
                        <div class="container-content">
                            <form class="margin-t">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Nombre" name='name' required="" onChange={updateUserData}></input>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Apellido" name='surname' required="" onChange={updateUserData}></input>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Email" name='email' required="" onChange={updateUserData}></input>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="Contraseña" name='password' required="" onChange={updateUserData}></input>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="Repetir contraseña" name='password2' required="" onChange={updateUserData}></input>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Teléfono" required="" name='phone' onChange={updateUserData}></input>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Direccion" required="" name='adress' onChange={updateUserData}></input>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Ciudad" required="" name='city' onChange={updateUserData}></input>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Fecha nacimiento Mes/Dia/Año XX/XX/XXXX" name='birth' required="" onChange={updateUserData}></input>
                                    </div>
                                </div>
                                <a class="text-darkyellow" href="#"><small>{msgError}</small></a>
                            </form>
                                <button type="submit" class="form-button button-l margin-b registerButon" onClick={() => Registrame()}>Registrar</button>

                        </div>
                    </div>
                </body>
            </html>
        )
    }

}
export default Register;