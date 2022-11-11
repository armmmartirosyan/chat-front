import { createReducer } from "@reduxjs/toolkit";
import { messagesListRequest, sendMessageRequest } from "../actions/messages";
import { SOCKET_FRIEND_TYPING, SOCKET_FRIEND_TYPING_END, SOCKET_NEW_MESSAGE } from "../actions/socket";

const initialState = {
  messagesList: [],
  total: 0,
  friendTyping: false
}

export default createReducer(initialState, {
  [messagesListRequest.rejected]: (state, action) => {
    state.messagesList = [];
  },
  [messagesListRequest.fulfilled]: (state, action) => {
    state.messagesList = action.payload.messages;
    state.total = action.payload.total;
  },
  [SOCKET_NEW_MESSAGE]: (state, action) => {
    state.messagesList.unshift(action.payload.data.message);
    state.total = state.total + 1;
  },
  [sendMessageRequest.fulfilled]: (state, action) => {
    state.messagesList.unshift(action.payload.message);
    state.total = state.total + 1;
  },
  [SOCKET_FRIEND_TYPING]: (state, action) => {
    state.friendTyping = true;
  },
  [SOCKET_FRIEND_TYPING_END]: (state, action) => {
    state.friendTyping = false;
  }
});