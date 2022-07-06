

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jwt-decode';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      token: ''
    },
    reducers: {
      login: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      logout: (state, action) => {
        return {
          token : ''
        }
        
      },
      update: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    },
    
});

export const loginUser = (body) => async (dispatch) => {
    try {
      
      const user = await axios.post("https://buscadordepeliculas.herokuapp.com/api/auth/login",body);
      
      let decodificada = jwt(user.data.token);

      //En caso de que todo haya ido bien, es decir, el backend y la red nos responden con un código 200 que significa que todo está ok
      if(user.status === 200) {
        //Procedo por fin al guardado en redux, aqui estoy guardando en el estado, aquello que se decodifica del token
        //y también el token por otro lado.
         dispatch(login({...decodificada,token: user.data.token}))
      } 

    } catch (error) {
      console.log(error)
    }
};

export const logOut = () => (dispatch) => {
  dispatch(logout());
};

export const updateUser = (datosUsuario,perfilUsuario) => async (dispatch) => {
        
  try {

      let body = {
        name: perfilUsuario.user_name,
        email: perfilUsuario.user_email,
        password: perfilUsuario.user_password
      }

      console.log("soy el maldito body", body);

      let config = {
          headers: { Authorization: `Bearer ${datosUsuario.token}` }
      };

      let resultado = await axios.put(`https://buscadordepeliculas.herokuapp.com/api/users/${datosUsuario.user_id}`,body, config);

      //Después de cambiar en la database los datos de usuario, cambiamos esos datos
      //en redux.

      if(resultado.status === 200) {
        console.log("entra aqui");
        //Hacemos un update local de las credenciales del usuario
         dispatch(update({perfilUsuario}));
      }

      // console.log("soy resultado", resultado);


      
  } catch (error) {

      console.log(error);
  }
}


//Exporto las funciones que en si realizan la accion
export const { login, logout, update } = userSlice.actions;

//userData contiene el estado del reducer, es decir, userData es lo que van a leer
//los componentes conectados a este reducer, para saber sus credenciales
export const userData = (state) => state.user;

export default userSlice.reducer;