import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { createUser, getUser, loginUser } from '../../api';
import Users from '../../types/Users';

type UserState = {
    user?: Users;
    errorLogin: string;
    errorCreate: string;
    successCreate: boolean;
};

export const getUserId = createAsyncThunk('users/getUser', async (id: string) => {
    try {
        const response = await getUser(id);

        return response;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

export const saveUser = createAsyncThunk('users/saveUsers', async (item: Users) => {
    try {
        const response = await createUser(item);

        return response.data;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

export const loginUserThunk = createAsyncThunk('users/loginUserThunk', async (item: Partial<Users>) => {
    try {
        const response = await loginUser(item.emailUser || '', item.password || '');

        return response;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

const user = createSlice({
    name: 'user',
    initialState: {
        errorLogin: '',
        errorCreate: '',
        successCreate: false,
        user: undefined,
    } as UserState,
    reducers: {
        clearError: (state) => ({ ...state, errorLogin: '', errorCreate: '' }),
        clearUser: (state) => ({ ...state, user: undefined }),
    },
    extraReducers(builder) {
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(loginUserThunk.rejected, (state, action) => {
            state.errorLogin = action.error.message || 'erro ao logar';
        });
        builder.addCase(loginUserThunk.pending, (state, action) => {
            state.errorLogin = '';
        });
        builder.addCase(getUserId.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(saveUser.pending, (state, action) => {
            state.errorCreate = '';
        });
        builder.addCase(saveUser.rejected, (state, action) => {
            state.errorCreate = action.error.message || 'erro ao logar';
        });
        builder.addCase(saveUser.fulfilled, (state, action) => {
            state.successCreate = true;
            window.location.href = '/';
        });
    },
});

export const { clearError, clearUser } = user.actions;
export const userReducer = user.reducer;
