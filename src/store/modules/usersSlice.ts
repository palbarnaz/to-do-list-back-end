import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

import Users from '../../types/Users';

const adapter = createEntityAdapter<Users>({
    selectId: (item) => item.id,
});

const users = createSlice({
    name: 'users',
    initialState: adapter.getInitialState(),
    reducers: {
        saveUser: adapter.addOne,
        saveTask: adapter.updateOne,
    },
});

export const { selectAll, selectById } = adapter.getSelectors((state: RootState) => state.users);
export const { saveUser, saveTask } = users.actions;
export const usersReducer = users.reducer;
