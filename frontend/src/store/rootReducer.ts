import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '../entities/users/store/userSlice.ts';

export const rootReducer = combineReducers({
    reducer: {
        user: userReducer,
    },
});

export default rootReducer;
