import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '..';

import { createTask, getFilter, getTask, taskDelete, taskEdit, taskStatus } from '../../api';
import { Task } from '../../types/Task';

const adapter = createEntityAdapter<Task>({
    // selectId: (item) => item.id,
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
    idUser: string;
    idTask: string;
    tEdit: Task;
};
export type taskRequest = {
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
        console.log(error);
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

export const editTask = createAsyncThunk('tasks/editTask', async ({ idUser, idTask, tEdit }: tEdit) => {
    try {
        const response = await taskEdit(idUser, idTask, tEdit);

        return response;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ idUser, idTask }: taskRequest) => {
    try {
        const response = await taskDelete(idUser, idTask);

        return response;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

export const statusTask = createAsyncThunk('tasks/statusTask', async ({ idUser, idTask, archived }: taskRequest) => {
    console.log(archived);

    try {
        const response = await taskStatus(idUser, idTask, archived);

        return response;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

const tasks = createSlice({
    name: 'tasks',
    initialState: adapter.getInitialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(saveTask.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
        });
        builder.addCase(getAllTask.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
        });
        builder.addCase(editTask.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
        });
        builder.addCase(statusTask.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
        });
        builder.addCase(tasksFilter.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
        });
        // builder.addCase(saveTask.rejected, (state, action) => {
        //     state.errorCreate = action.error.message || 'erro ao criar task';
        // });
    },
});

export const tasksReducer = tasks.reducer;
export const { selectAll, selectById } = adapter.getSelectors((state: RootState) => state.tasks);
