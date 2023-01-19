import {createSlice, configureStore} from '@reduxjs/toolkit';
import {selectedTheme} from '../constants';
import {lightTheme, darkTheme} from '../constants';



const initialState = {
  appMode: lightTheme,
  darkmode: false,
  error: null,
};

const themeSlice = createSlice({name: 'theme', initialState, reducers:{
    toggleThemeBegin(state,action){
        state.appMode = lightTheme;
        state.darkmode = false;
        state.error = null;

    },
    toggleThemeSuccess(state,action){
        state.appMode = darkTheme;
        state.darkmode = true;
        state.error = null;
    },
    toggleThemeFailure(state,action){
        state.error = "ERROR Dark Mode"; 
    }
}});


export const { toggleThemeBegin,toggleThemeSuccess,toggleThemeFailure} = themeSlice.actions;
export default themeSlice.reducer
