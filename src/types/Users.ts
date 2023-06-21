import { Task } from './Task';

type Users = {
    id: string;
    emailUser: string;
    password: string;
    tasks: Array<Task>;
};

export default Users;
