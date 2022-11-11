import { io } from "socket.io-client";
import Utils from "../../helpers/Utils";
import { toast } from "react-toastify";
import newMessageAudio from '../../assets/audio/new-message.mp3';

let socket;
const { REACT_APP_API_URL } = process.env;
const audio = new Audio(newMessageAudio);

export const SOCKET_NEW_MESSAGE = 'SOCKET_NEW_MESSAGE';
export const SOCKET_USER_CONNECT = 'SOCKET_USER_CONNECT';
export const SOCKET_USER_DISCONNECT = 'SOCKET_USER_DISCONNECT';
export const SOCKET_FRIEND_TYPING = 'SOCKET_FRIEND_TYPING';
export const SOCKET_FRIEND_TYPING_END = 'SOCKET_FRIEND_TYPING_END';

let socketTypingTimeout = null;

export function socketInit(token) {
  return (dispatch) => {
    if (socket) {
      return;
    }

    socket = io(REACT_APP_API_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    socket.on('connect', () => {
      console.log('connect')
    })
    socket.on('user-connect', (data) => {
      dispatch({
        type: SOCKET_USER_CONNECT,
        payload: { data }
      })
    })
    socket.on('user-disconnect', (data) => {
      dispatch({
        type: SOCKET_USER_DISCONNECT,
        payload: { data }
      })
    });
    socket.on('friend-typing', (data) => {
      const currentFriendId = Utils.getFriendId();
      if (currentFriendId === data.friendId) {
        dispatch({
          type: SOCKET_FRIEND_TYPING,
          payload: { data }
        });
        clearTimeout(socketTypingTimeout);
        socketTypingTimeout = setTimeout(() => {
          dispatch({
            type: SOCKET_FRIEND_TYPING_END,
            payload: { data }
          });
        }, 3000)
      }
    });
    socket.on('new-message', (data) => {
      const currentFriendId = Utils.getFriendId();

      if (currentFriendId === data.message.from) {
        dispatch({
          type: SOCKET_NEW_MESSAGE,
          payload: { data }
        });
      } else {
        toast.info(`New Message From ${data.message.userFrom.firstName}`);
        try {
          audio.play();
        } catch (e) {
          //
        }
      }

    })
  }
}

export function socketDisconnect() {
  return (dispatch) => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }
}

export const SOCKET_TYPING = ' SOCKET_TYPING';

export function socketTypingRequest(friendId) {
  socket.emit('typing', { friendId });
  return {
    type: SOCKET_TYPING,
    payload: { friendId }
  };
}
