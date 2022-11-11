import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {messagesListRequest} from "../store/actions/messages";
import {useParams} from "react-router-dom";
import moment from "moment/moment";
import _ from "lodash";
import MediaPicker from "./MediaPicker";
import {toast} from "react-toastify";

function MessagesList() {
    const messageBody = useRef();
    const dispatch = useDispatch();
    const {friendId} = useParams();

    const messagesList = useSelector(store => store.messages.messagesList);
    const messagesListStatus = useSelector(store => store.status.messagesListStatus);
    const isEndReached = useRef(true);
    const prevMessagesLength = useRef(messagesList.length);

    useEffect(() => {
        dispatch(messagesListRequest({friendId}));
    }, [friendId]);

    useEffect(() => {
        if (isEndReached.current) {
            messageBody.current.scrollTo({top: messageBody.current.scrollHeight});
        } else if (prevMessagesLength.current < messagesList.length) {
            toast.info('New Message', {
                onClick: () => {
                    messageBody.current.scrollTo({
                        top: messageBody.current.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            })
        }
        prevMessagesLength.current = messagesList.length;
    }, [messagesList]);

    const handleScroll = () => {
        const {height} = messageBody.current.getBoundingClientRect();
        isEndReached.current = messageBody.current.scrollTop + height + 30 >= messageBody.current.scrollHeight;
    }

    return (
        <div onScroll={handleScroll} className="card-body msg_card_body" ref={messageBody}>
            {messagesListStatus === 'pending' ? 'Loading ...' : null}
            {messagesListStatus === 'success' ? [...messagesList].reverse().map(message => {
                if (+friendId === message.from) {
                    return (
                        <div key={message.id} className="d-flex justify-content-start mb-4">
                            <div className="img_cont_msg">
                                <img src={message.userFrom.avatar}
                                     className="rounded-circle user_img_msg"/>
                            </div>
                            <div className="msg_cotainer">
                                <p className="msg-text">{message.text}</p>
                                {
                                    !_.isEmpty(message.files) ? (
                                        message.files.map((file) => <MediaPicker file={file} key={file.id}/>)
                                    ) : null
                                }
                                <span className="msg_time">{moment(message.createdAt).calendar()}</span>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div key={message.id} className="d-flex justify-content-end mb-4">
                            <div className="msg_cotainer_send">
                                <p className="msg-text">{message.text}</p>
                                {
                                    !_.isEmpty(message.files) ? (
                                        message.files.map((file) => <MediaPicker file={file} key={file.id}/>)
                                    ) : null
                                }
                                <span className="msg_time_send">{moment(message.createdAt).calendar()}</span>
                            </div>
                            <div className="img_cont_msg">
                                <img src={message.userFrom.avatar} className="rounded-circle user_img_msg"/>
                            </div>
                        </div>
                    )
                }
            }) : null}


        </div>
    );
}

export default MessagesList;
