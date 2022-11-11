import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";

export const messagesListRequest = createAsyncThunk('messages/list', async (payload = {}) => {
  const { friendId, ...params } = payload;
  const { data } = await Api.messagesList(friendId, params);

  return data;
});

export const sendMessageRequest = createAsyncThunk('messages/send', async (payload = {}) => {
  const { friendId, onUploadProcess, ...params } = payload;
  const { data } = await Api.sendMessage(friendId, params, onUploadProcess);

  return data;
});
