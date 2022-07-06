

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchSlice = createSlice({
    name: 'films',
    initialState: {
      //cuando busqueis varias, poned un array vacio aqui
      films: []
    },
    reducers: {
      films: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    },
});

export const searchFilm = (argumento) => async (dispatch) => {
    try {

      let body = {
        title : argumento
      };
      
      const peliculas = await axios.post(`https://videoclub-proyecto5.herokuapp.com/api/films/title`,body);
    //const peliculas = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&query=${argumento}&page=1&include_adult=false`);
      console.log(peliculas);
      //En caso de que todo haya ido bien, es decir, el backend y la red nos responden con un código 200 que significa que todo está ok
      if(peliculas.status === 200) {
        // console.log(peliculas);
         dispatch(films(peliculas.data.data))
      } 

    } catch (error) {
      console.log(error)
    }
};


//Exporto las funciones que en si realizan la accion
export const { films } = searchSlice.actions;

//userData contiene el estado del reducer, es decir, userData es lo que van a leer
//los componentes conectados a este reducer, para saber sus credenciales
export const searchData = (state) => state.films;

export default searchSlice.reducer;