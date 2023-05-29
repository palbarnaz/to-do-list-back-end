import { Task } from './Task';

type Users = {
    id: number;
    emailUser: string;
    password: string;
    tasks: Array<Task>;
};

export default Users;
