import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '..';

import { createTask, getFilter, getTask, taskDelete, taskEdit, taskStatus } from '../../api';
import { Task } from '../../types/Task';

const adapter = createEntityAdapter<Task>({
    selectId: (item) => {
        if (item && item.id) {
            return item.id;
        }

        return 0;
    },
});

type tCreate = {
    idUser: string;
    task: Task;
};

export type tEdit = {
    idTask: string;
    tEdit: Task;
};
export type taskRequest = {
    idTask: string;
    archived: boolean;
    task?: Task;
};

export type taskDelete = {
    idUser: string;
    idTask: string;
    archived: boolean;
    task?: Task;
};

export type tFilter = {
    idUser: string;
    description: string;
    archived?: boolean;
};

export const saveTask = createAsyncThunk('tasks/create', async ({ idUser, task }: tCreate) => {
    try {
        const response = await createTask(idUser, task);

        return response;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

export const getAllTask = createAsyncThunk('tasks/getAllTask', async (id: string) => {
    try {
        const response = await getTask(id);

        return response;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

export const tasksFilter = createAsyncThunk('tasks/filterTasks', async ({ idUser, description, archived }: tFilter) => {
    try {
        let response = [];

        if (archived !== undefined) {
            response = await getFilter(idUser, description, archived);
        } else {
            response = await getFilter(idUser, description);
        }
        return response;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

export const editTask = createAsyncThunk('tasks/editTask', async ({ idTask, tEdit }: tEdit) => {
    try {
        const response = await taskEdit(idTask, tEdit);

        return response;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ idUser, idTask }: taskDelete) => {
    try {
        await taskDelete(idUser, idTask);

        return idTask;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

export const statusTask = createAsyncThunk('tasks/statusTask', async ({ idTask, archived }: taskRequest) => {
    try {
        const response = await taskStatus(idTask, archived);

        return response;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

const tasks = createSlice({
    name: 'tasks',
    initialState: adapter.getInitialState({
        loading: false,
    }),
    reducers: {},
    extraReducers(builder) {
        builder.addCase(saveTask.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(saveTask.fulfilled, (state, action) => {
            adapter.addOne(state, action.payload);
            state.loading = false;
        });
        builder.addCase(getAllTask.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllTask.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
            state.loading = false;
        });
        builder.addCase(editTask.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editTask.fulfilled, (state, action) => {
            adapter.upsertOne(state, action.payload);
            state.loading = false;
        });
        builder.addCase(deleteTask.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            adapter.removeOne(state, action.payload);
            state.loading = false;
        });
        builder.addCase(statusTask.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(statusTask.fulfilled, (state, action) => {
            adapter.upsertOne(state, action.payload);
            state.loading = false;
        });
        builder.addCase(tasksFilter.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(tasksFilter.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
            state.loading = false;
        });
    },
});

export const tasksReducer = tasks.reducer;
export const { selectAll, selectById } = adapter.getSelectors((state: RootState) => state.tasks);
