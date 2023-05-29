import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: '',
};

const userLogged = createSlice({
    name: 'userLogged',
    initialState,
    reducers: {
        saveUserLogged: (_, action: PayloadAction<string>) => ({ value: action.payload }),
        logoutUser: () => ({
            value: '',
        }),
    },
});
export const { saveUserLogged, logoutUser } = userLogged.actions;
export const userLoggedReducer = userLogged.reducer;
