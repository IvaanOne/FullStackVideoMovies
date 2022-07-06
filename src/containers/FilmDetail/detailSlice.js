

import { createSlice } from '@reduxjs/toolkit';

export const detailSlice = createSlice({
    name: 'details',
    initialState: {
      
    },
    reducers: {
      dataFilm: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    },
});

export const keepFilm = (pelicula) => async (dispatch) => {
    
    dispatch(dataFilm(pelicula));
       
};


//Exporto las funciones que en si realizan la accion
export const { dataFilm } = detailSlice.actions;


export const takeData = (state) => state.dataFilm;

export default detailSlice.reducer;