import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const setToken = createAction('user/set-token', (payload = {}) => {
    return {payload};
});

export const registerRequest = createAsyncThunk('users/register', async (payload, thunkApi) => {
    try {
        const {firstName, lastName, email, password} = payload;
        const {data} = await Api.register(firstName, lastName, email, password)

        return {data};
    } catch (e) {
        return thunkApi.rejectWithValue(e.response);
    }
});

export const loginRequest = createAsyncThunk('users/login', async (payload) => {
    const {data} = await Api.login(payload.email, payload.password);
    return {data, remember: payload.remember};
});

export const contactList = createAsyncThunk('users/list', async (payload) => {
    const {data} = await Api.userList(payload.search);
    return {data};
});

export const singleUserRequest = createAsyncThunk('users/single', async (payload) => {
    const {data} = await Api.singleUser(payload.id);
    return {data};
})
