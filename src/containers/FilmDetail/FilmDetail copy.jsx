
import React, { useEffect } from 'react';
import './FilmDetail.css';

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { userData } from '../../containers/User/userSlice';
import { takeData } from '../../containers/FilmDetail/detailSlice';
import axios from 'axios';

const FilmDetail = () => {

    //Guardamos en otra variable, los datos de redux de las credenciales
    
    let credenciales = useSelector(userData);
    
    //Guardamos en una variable, los datos de redux de la película

    let detallesPelicula = useSelector(takeData);

    //Variable para los datos de navegación de react-router-dom

    let navigate = useNavigate();

    //Función useEffect para cuando el componente se ha montado

    useEffect(()=>{
        // console.log(token);
        console.log(detallesPelicula);
    },[]);


    const viajar = (destino) => {

        setTimeout(()=>{
            navigate(destino)
        },200);
    }

    const alquilar = async () => {

        console.log(credenciales);


        let body = {
            user_id: credenciales.user_id,
            film_id: detallesPelicula.id
            //fechas...
            //precio...
        }

        console.log(body);


        //Llamada a axios....... 
        // try {

        //     let resultado = await axios.post("urlendpointalquiler",body);

        // } catch (error) {
        //     console.log(error);
        // }

    }

        return (
            <div className="filmDetailDesign">
                <div>

                    {detallesPelicula.original_title}
                </div>

                <div>

                    {detallesPelicula.overview}
                </div>

                <div>

                    <img className="peliDesign" src={detallesPelicula.imgLink}/>
                </div>


                {/* Con el condicional && logramos una especie de "if de renderizado" dentro de nuestro return */}
                {credenciales?.token &&
                    <div className="botonRent" onClick={()=>alquilar()}>
                        Rent
                    </div>
                }

                <div className="buttonBack" onClick={()=> viajar("/")}>
                    Volver
                </div>
            </div>
        )

}

export default FilmDetail;