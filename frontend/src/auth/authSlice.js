import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        credentials: (state, action) => {
            state.userInfo = action.payload; // Store user info in userInfo object
            localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Update localStorage
            return state;
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            localStorage.clear();
        },
    },
});


export const { credentials, logout } = authSlice.actions;

export const clearPersistedState = () => (dispatch) => {
    dispatch(logout());
    localStorage.clear();
};

// Selector functions to access user information from userInfo object
export const selectUser = (state) => state.auth.userInfo; // Access userInfo object directly
export const selectToken = (state) => state.auth.userInfo?.token; // Access nested token property
export const selectIsLoggedIn = (state) => state.auth.userInfo !== null; // Check if userInfo exists

export default authSlice.reducer;