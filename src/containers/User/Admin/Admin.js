import React from 'react';
import './Admin.scss'

import axios from 'axios'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { userData } from '../../User/userSlice'


const Admin = () => {

    const credenciales = useSelector(userData);
    const datosUsuario = useSelector(userData)
    let navegador = useNavigate()
    
    //Hooks
    const [cambiarPantalla, setCambiarPantalla] = useState([])
    const [valorInput, setValorInput] = useState()

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (datosUsuario.token === "") {
            navegador('/')
        }else if(credenciales?.user_role !== "boss"){
            navegador('/')
        }else if(credenciales?.user_role === "client"){
            navegador('/')
        }
    });

    const getUsers = async () => {
        let config = {
            headers: { Authorization: `Bearer ${datosUsuario.token}` }
        }
        
        let resultado = await axios.get("https://proyecto-bucador-peliculas.herokuapp.com/api/users/allProfile", config)
        setCambiarPantalla(resultado.data.data)
        // console.log(resultado)
    }


    const getOrders = async () => {
        let config = {
            headers: { Authorization: `Bearer ${datosUsuario.token}` }
        }

        let resultado = await axios.get("https://proyecto-bucador-peliculas.herokuapp.com/api/orders", config)

        // console.log(resultado.data.data)
        setCambiarPantalla(resultado.data.data)
    }

    const updateInput = e => setValorInput(e.target.value)
    
    return (
        <div className='adminDesign'>
            <div className="">

                <div className="">
                    <p>Buscar todos los usuarios</p>
                    <button onClick={() => getUsers()}>Buscar</button>
                </div>
                <div className="">
                    <p>Buscar todas las ordenes</p>
                    <button onClick={() => getOrders()}>Buscar</button>
                </div>
                
            </div>

            <div className="resultados">
                {cambiarPantalla.map(id => {
                                        
                    if (id.returnDate !== undefined) {
                        return (
                            <div className='resultadosAdmin'>
                                <strong> Order ID: </strong> {id._id} <br />
                                <strong> User ID:</strong> {id.userId} <br />
                                <strong> Movie Name:</strong>  {id.title} <br />
                                <strong>Order Date:</strong>   {id.rentalDate} <br />
                                <strong>Return Date:</strong>  {id.returnDate} <br />
                            </div>
                        )
                    } else {
                        return (

                            <div className='resultadosAdmin'>
                                <strong> ID:</strong>  {id._id} <br />
                                <strong> Email:</strong> {id.email} <br />
                                <strong>   Name:</strong>  {id.name} <br />
                                <strong> Created:</strong> {id.createdAt} <br />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Admin;