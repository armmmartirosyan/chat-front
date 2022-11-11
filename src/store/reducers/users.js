import { createReducer } from "@reduxjs/toolkit";
import {contactList, loginRequest, singleUserRequest} from "../actions/users";
import Account from "../../helpers/Account";
import { SOCKET_USER_CONNECT, SOCKET_USER_DISCONNECT } from "../actions/socket";

const initialState = {
  token: Account.getToken(),
  contactList: [],
  contactListStatus: '',
  user: {},
}

export default createReducer(initialState, {
  [loginRequest.fulfilled]: (state, action) => {
    const { token } = action.payload.data;
    const { remember } = action.payload;

    Account.setToken(token, remember);
    state.token = token
  },

  [singleUserRequest.fulfilled]: (state, action) => {
    const data = action.payload.data;
    state.user = data.user;
  },

  [contactList.fulfilled]: (state, action) => {
    const data = action.payload.data;

    state.contactList = data.users;
  },

  [SOCKET_USER_CONNECT]: (state, action) => {
    const { userId } = action.payload.data;
    state.contactList = state.contactList.map(user => {
      if (+user.id === +userId) {
        user.isOnline = true;
      }
      return user;
    })
    state.user = {...state.user, isOnline: true}
  },
  [SOCKET_USER_DISCONNECT]: (state, action) => {
    const { userId, lastVisit } = action.payload.data;
    state.contactList = state.contactList.map(user => {
      if (+user.id === +userId) {
        user.isOnline = false;
        user.lastVisit = lastVisit;
      }
      return user;
    })
    state.user = {...state.user, isOnline: false}
  }
})
