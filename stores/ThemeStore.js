import {createSlice, configureStore} from '@reduxjs/toolkit';
import themeSlice from './themeSlice';


const ThemeStore =  configureStore({
    reducer:{
        theme:themeSlice
    }
})

export default ThemeStore;