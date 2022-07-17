

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { DatePicker } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './Home.scss';
import { useSelector, useDispatch } from 'react-redux';
import { searchData } from '../../components/Header/searchSlice';
import { keepFilm } from '../FilmDetail/detailSlice';
import { useNavigate } from 'react-router-dom';
import { searchContext } from '../../components/Header/Header';



const Home = () => {
    // let offset = peliculasPaginate * page_size;
    let peliculas = useSelector(searchData);
    let navegador = useNavigate();
    let dispatch = useDispatch();
    let page_size = 8;
    let arraySearch = [];

    const viajar = (destino) => {
        navegador(destino)
    };

    // const paginate = (page_number) => {
    //     setPeliculasPaginate(page_number);
    //     return peliculasDefecto.slice((page_number -1) * page_size, page_number * page_size);
    // };

    

    //Hook de películas por defecto al entrar en la aplicación
    const [peliculasDefecto, setPeliculasDefecto] = useState([]);
    const [searcher, setSearcher] = useState(searchContext);



    useEffect(() => {

        PeliculasApi();

    }, []);

    const PeliculasApi = async () => {

        try {
            

            let peliculas = await axios.get("https://proyecto-bucador-peliculas.herokuapp.com/api/movies");

            //seteo las películas al hook para que se recargue el componente

            setPeliculasDefecto(peliculas.data.data);
            arraySearch.push(peliculasDefecto);

        } catch (error) {
            console.log(error)
        }
    };


    const PeliculaEscogida = (pelicula) => {

        //Primer paso, guardamos la película escogida en RDX

        dispatch(keepFilm(pelicula));


        //Segundo paso, redirigimos a FilmDetail donde veremos
        //los detalles de la película y si estamos logeados (tenemos token),
        //podremos alquilar la película.

        setTimeout(() => {
            navegador("/detail");
        }, 500);

    }



    useEffect(() => {
        // console.log("soy peliculas",peliculasDefecto);
    })

    if (peliculas[0]?.title) {
        return (
            <div>marc te odio {peliculas[0]?.title}</div>
        )
    } else if (peliculasDefecto[0]?.title !== '') {
        
        return (
            <div class="container mt-2 tumadre">
                <div class="row">
                    {
                        peliculasDefecto.map(pelicula => {
                            return (

                                <div class="col-md-3 col-sm-6" key={pelicula._id} onClick={() => PeliculaEscogida(pelicula)}>
                                    <div class="card card-block">
                                        {/* <h4 class="card-title text-right"><i class="material-icons">CLICK PARA VER MÁS</i></h4> */}
                                        <img src={pelicula.imgLink} alt="Movie preview"></img>
                                        <h5 class="card-title mt-3 mb-3">{pelicula.title}</h5>
                                        <p class="card-text">{pelicula.genre}<br></br>{pelicula.year}<br></br>{pelicula.length}</p>
                                    </div>
                                </div>

                            )

                        })
                    }
                </div>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link">1</a></li>
                        <li class="page-item"><a class="page-link">2</a></li>
                        <li class="page-item"><a class="page-link">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )

    } else {
        return (
            <div className="homeDesign">CARGANDO....</div>
        )

    }

}
export default Home;