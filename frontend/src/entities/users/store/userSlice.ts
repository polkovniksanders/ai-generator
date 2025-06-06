import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@reduxjs/toolkit/query';

const initialState = {
    initData: {
        authDate: '',
        chatInstance: '',
        chatType: '',
        hash: '',
        startParam: '',
        user: {
            allowsWriteToPm: false,
            firstName: '',
            id: 0,
            languageCode: '',
            lastName: '',
            photoUrl: '',
            userName: '',
        },
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            return { ...state, ...payload };
        },
    },
});

export const selectUserState = (state: RootState) => state.user;

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
