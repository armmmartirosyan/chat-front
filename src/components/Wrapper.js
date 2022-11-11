import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { socketDisconnect, socketInit } from "../store/actions/socket";

function Wrapper(props) {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.users.token);

  useEffect(() => {
    if (token) {
      dispatch(socketInit(token));
    } else {
      dispatch(socketDisconnect());
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <div id="wrapper">
      {props.children}
    </div>
  );
}

export default Wrapper;
