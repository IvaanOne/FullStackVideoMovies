

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { DatePicker } from 'antd';
import { ShoppingCartOutlined }  from '@ant-design/icons';
import 'antd/dist/antd.css';
import './Home.scss';
import { useSelector,useDispatch } from 'react-redux';
import { searchData } from '../../components/Header/searchSlice';
import { keepFilm } from '../../containers/FilmDetail/detailSlice';
import { useNavigate } from 'react-router-dom';


 
const Home = () => {

    let peliculas = useSelector(searchData);
    let navegador = useNavigate();
    let dispatch = useDispatch();

    //Hook de películas por defecto al entrar en la aplicación
    const [peliculasDefecto, setPeliculasDefecto] = useState([]);

    // const [peliculas, setPeliculas] = useState(useSelector(searchData));

    // const [fecha, setFecha] = useState("");
    // const [diferencia, setDiferencia] = useState("");

    // const handlerFecha = (e) => {
        
   
    //     // setFecha(e?._d);

    //     //Opero entre fechas....

    //     let ahora = moment().format('YYYY-MM-DD HH:mm:ss');

    //     let escogida = e._d;

    //     let days = moment(ahora).diff(escogida, "days");
    //     let hours = moment(ahora).diff(escogida, "hours");
    //     let mins = moment(ahora).diff(escogida, "mins");
        
    //     //con este método, añadimos días a una fecha actual, y guardamos en la variable, el resultado que sería la fecha sumada
    //     let fiestaIvan = moment(ahora).add(267, "days");
    //     // setDiferencia(JSON.stringify(fiestaIvan));
    //     setDiferencia(days);


    // }

    useEffect(()=>{
        //Recordamos que este es el primero de todos los useEffect, se ejecuta
        //nada más se ha montado el componente.


        //Algo muy importante a recordar es que al useEffect NO le gusta que trabajemos dentro 
        //de él con try catch, el quiere una funcion externa que haga eso, para no entrar
        //en bucles infinitos

        PeliculasApi();

    },[]);

    const PeliculasApi = async () => {

        try {

            let peliculas = await axios.get("https://proyecto-bucador-peliculas.herokuapp.com/api/movies");
            
            //seteo las películas al hook para que se recargue el componente

            setPeliculasDefecto(peliculas.data.data);
            console.log(peliculas);
            
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

        setTimeout(()=>{
            navegador("/detail");
        },500);

        console.log(pelicula);
    }



    useEffect(()=>{
        // console.log("soy peliculas",peliculasDefecto);
    })
    
    if(peliculas[0]?.title){
        return (
            <div>marc te odio {peliculas[0]?.title}</div>
        )
    }else if(peliculasDefecto[0]?.title !== ''){
        return (
            <div className='homeDesign'>

                
               
               {/* <DatePicker onChange={handlerFecha}/> */}
               {/* <div>La fecha actual es..: {}</div> */}
               {/* <div>La fecha escogida es: {JSON.stringify(fecha)}</div> */}
               {/* <div>Estamos vivos en este mundo cruel.... {diferencia}
               <ShoppingCartOutlined />
               </div> */}

               {/* Mapeamos las películas que han venido de la API theMovieDB */}

               {
                peliculasDefecto.map(pelicula => {
                    console.log(pelicula)
                    return(
                        <div className="cardFilm" key={pelicula._id} onClick={()=>PeliculaEscogida(pelicula)}>
                            {pelicula.title}
                            <img className="peliDesign" src={pelicula.imgLink}/>

                        </div>
                    )
                })
               }

            </div>
        )
    }else{
        return (
            <div className="homeDesign">CARGANDO....</div>
        )
    }
   
}
export default Home;