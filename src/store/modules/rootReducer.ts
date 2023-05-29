import { combineReducers } from '@reduxjs/toolkit';

import { userLoggedReducer } from './userLoggedSlice';
import { usersReducer } from './usersSlice';

export default combineReducers({
    users: usersReducer,
    userLogged: userLoggedReducer,
});
