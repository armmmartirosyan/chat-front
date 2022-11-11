import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {singleUserRequest} from "../store/actions/users";
import classNames from "classnames";

function ChatHeader() {
    const {friendId} = useParams();
    const dispatch = useDispatch();
    const total = useSelector(state => state.messages.total);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(singleUserRequest({id: friendId}));
    }, [friendId]);

    return (
        <>
            {
                user.firstName ? (
                    <div className="card-header msg_head">
                        <div className="d-flex bd-highlight">
                            <div className="img_cont">
                                <img
                                    src={user.avatar}
                                    className="rounded-circle user_img"
                                />
                                <span className={classNames(
                                    'online_icon',
                                    {offline: !user.isOnline}
                                )}></span>
                            </div>
                            <div className="user_info">
                                <span>{`${user.firstName || ' '} ${user.lastName || ' '}`}</span>
                                <p>{`${total} Messages`}</p>
                            </div>
                            <div className="video_cam">
                                <span><i className="fas fa-video"></i></span>
                                <span><i className="fas fa-phone"></i></span>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}

export default ChatHeader;