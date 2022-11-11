import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

function WrapperLogOut(props) {
    const token = useSelector((store) => store.users.token);

    if (token) {
        return <Navigate to="/" replace/>
    }

    return (
        <div id="wrapper-logout">
            {props.children}
        </div>
    );
}

export default WrapperLogOut;
