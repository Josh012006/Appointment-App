import User from "@/interfaces/userInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface InitialState {
    isAuth: boolean,
    infos: {} | User,
}

const initialState = {
    isAuth: false,
    infos: {}
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            return initialState;
        },
        login: (state, action) => {
            return {
                isAuth: true,
                infos: action.payload
            };
        },
    }
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;