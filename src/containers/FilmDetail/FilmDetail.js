
import React, { useEffect } from 'react';
import './FilmDetail.scss';

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { userData } from '../User/userSlice';
import { takeData } from './detailSlice';
import axios from 'axios';

const FilmDetail = () => {

    //Guardamos en otra variable, los datos de redux de las credenciales

    let credenciales = useSelector(userData);

    //Guardamos en una variable, los datos de redux de la película

    let detallesPelicula = useSelector(takeData);

    //Variable para los datos de navegación de react-router-dom

    let navigate = useNavigate();

    //Función useEffect para cuando el componente se ha montado

    useEffect(() => {
        // console.log(token);
        console.log(detallesPelicula);
    }, []);


    const viajar = (destino) => {

        setTimeout(() => {
            navigate(destino)
        }, 200);
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
                            <li class="tag__item play yellow">
                                <a href="#"><i class="fas fa-play mr-2"></i>Alquilar</a>
                            </li>
                        </ul>
                    </div>
                </article>
                    <a href="#"><i class="fas fa-play mr-2"></i>Volver</a>
            </div>
        </section>
    )

}

export default FilmDetail;