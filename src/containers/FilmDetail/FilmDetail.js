
import React, { useState, useEffect } from 'react';
import './FilmDetail.scss';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userData } from '../User/userSlice';
import { takeData } from './detailSlice';
import axios from 'axios';
import Home from '../Home/Home';

const FilmDetail = () => {


    //HOOK
    const [msgError, setMsgError] = useState("");
    //Guardamos en otra variable, los datos de redux de las credenciales

    let credenciales = useSelector(userData);

    //Guardamos en una variable, los datos de redux de la película

    let detallesPelicula = useSelector(takeData);

    //Variable para los datos de navegación de react-router-dom

    let navigate = useNavigate();

    //Función useEffect para cuando el componente se ha montado

    useEffect(() => {
                
    }, []);

    useEffect(()=>{
        if (credenciales.token === "") {
            navigate('/')
          }
    });

    const volver = () =>{

        setTimeout(()=>{
            navigate("/")
        }, 500)
    }
        
    const alquilar = async () => {
        
        try {
            
            let body = {
                title: detallesPelicula.title
            };

            let config = {
                headers: { Authorization: `Bearer ${credenciales.token}` }
              };
      
            let resultado = await axios.post(`https://proyecto-bucador-peliculas.herokuapp.com/api/orders/create`, body, config)
            
            setMsgError(`Has alquilado ${resultado.title} `)
            
        } catch (error) {
            setMsgError(`${error.response.data.message}`)
            }
    }
    
    return (
        <section class="dark">
            <div class="container py-4 detailDesign">
                <h1 class="h1 text-center" id="pageHeaderTitle"></h1>

                
                <article class="postcard dark yellow detailCard">
                    <a class="postcard__img_link" href="#">
                        <img class="postcard__img" src={detallesPelicula.imgLink} alt="Image Title" />
                    </a>
                    <div class="postcard__text">
                        <h1 class="postcard__title yellow"><a href="#">{detallesPelicula.title}</a></h1>
                        <div class="postcard__subtitle small">
                            <time datetime="2020-05-25 12:00:00">
                                <i class="fas fa-calendar-alt mr-2"></i>{detallesPelicula.year}
                            </time>
                        </div>
                        <div class="postcard__bar"></div>
                        <div class="postcard__preview-txt">{detallesPelicula.sinopsis}</div>
                        <ul class="postcard__tagbox">
                            <li class="tag__item"><i class="fas fa-tag mr-2"></i>{detallesPelicula.genre}</li>
                            <li class="tag__item"><i class="fas fa-clock mr-2"></i>{detallesPelicula.length}</li>
                            <li class="tag__item play yellow" onClick={()=>alquilar()}>
                                <a href="#"><i class="fas fa-play mr-2"></i>Alquilar</a>
                            </li>
                        </ul>
                    </div>
                </article>
                    <a href="#" onClick={()=>volver()}><i class="fas fa-play mr-2"></i>Volver</a>
            </div>
        </section>
    )

}

export default FilmDetail;