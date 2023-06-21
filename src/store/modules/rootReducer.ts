import { combineReducers } from '@reduxjs/toolkit';

import { tasksReducer } from './tasksSlice';
import { userLoggedReducer } from './userLoggedSlice';
import { userReducer } from './userSlice';

export default combineReducers({
    user: userReducer,
    userLogged: userLoggedReducer,
    tasks: tasksReducer,
});
