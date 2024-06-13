import { createSlice } from '@reduxjs/toolkit';

const getUserInfoFromLocalStorage = () => {
    try {
        const storedUserInfo = localStorage.getItem('userInfo');
        return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    } catch (error) {
        console.error('Error parsing userInfo from localStorage:', error);
        return null;
    }
};

const initialState = {
    userInfo: getUserInfoFromLocalStorage(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        credentials: (state, action) => {
            if (action.payload) {
                state.userInfo = action.payload;
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            } else {
                console.warn('Attempted to set userInfo to undefined');
            }
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});

export const { credentials, logout } = authSlice.actions;

export const clearPersistedState = () => (dispatch) => {
    dispatch(logout());
    localStorage.clear();
};

// Selector functions to access user information from userInfo object
export const selectUser = (state) => state.auth.userInfo;
export const selectToken = (state) => state.auth.userInfo?.token;
export const selectIsLoggedIn = (state) => state.auth.userInfo !== null;

export default authSlice.reducer;
