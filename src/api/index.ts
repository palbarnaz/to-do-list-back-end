import axios from 'axios';

import { Task } from '../types/Task';
import Users from '../types/Users';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export async function loginUser(emailUser: string, password: string) {
    const res = await api.get(`users/${emailUser}/${password}`);

    return res.data;
}

export async function createUser(item: Users) {
    const res = await api.post('users', item);
    return res.data;
}

export async function getUser(idUser: string) {
    const res = await api.get(`users/${idUser}`);

    return res.data;
}

export async function getTask(idUser: string) {
    const res = await api.get(`tasks/${idUser}`);

    return res.data;
}

export async function getFilter(idUser: string, description: string, archived?: boolean) {
    let params = `?description=${description}`;
    params += archived !== undefined ? `&archived=${archived}` : '';

    const res = await api.get(`tasks/${idUser}/filter/${params}`);

    return res.data;
}

export async function createTask(idUser: string, task: Task) {
    const res = await api.post(`tasks/${idUser}`, task);
    return res.data;
}
export async function taskEdit(idUser: string, idTask: string, task: Task) {
    const res = await api.put(`tasks/${idUser}/${idTask}`, task);
    return res.data;
}

export async function taskDelete(idUser: string, idTask: string) {
    const res = await api.delete(`tasks/${idUser}/${idTask}`);
    return res.data;
}

export async function taskStatus(idUser: string, idTask: string, archived: boolean) {
    const res = await api.put(`tasks/${idUser}/statusTask/${idTask}`, { archived });

    return res.data;
}
