import User from "@/interfaces/userInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Cookies from 'js-cookie';


interface InitialState {
    isAuth: boolean,
    infos: null | User,
}

const initialState : InitialState = {
    isAuth: false,
    infos: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => {
            // Détruire le cookie lors de la déconnexion
            Cookies.remove('userHealthAppointment');

            // Update le state
            return initialState;
        },
        login: (state, action) => {
            // Stocker les informations de l'utilisateur dans un cookie
            Cookies.set('userHealthAppointment', JSON.stringify(action.payload), { expires: 5, sameSite: 'Strict' }); // Le cookie expirera après 5 jours

            // Update le state avec les informations du user
            return {
                isAuth: true,
                infos: action.payload
            };
        },
        loadUserFromCookie: (state) => {
            const userCookie = Cookies.get('userHealthAppointment');
            if (userCookie) {
                return {
                    isAuth: true,
                    infos: JSON.parse(userCookie)
                }
            }
        }
    }
});

export const { logout, login, loadUserFromCookie } = authSlice.actions;

export default authSlice.reducer;