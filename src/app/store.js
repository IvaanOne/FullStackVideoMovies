import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../containers/User/userSlice';
import searchSlice from '../components/Header/searchSlice';
import detailSlice from '../containers/FilmDetail/detailSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        films: searchSlice,
        dataFilm: detailSlice    
    },
    
});