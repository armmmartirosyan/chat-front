import React, {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {sendMessageRequest} from "../store/actions/messages";
import {toast} from "react-toastify";
import {socketTypingRequest} from "../store/actions/socket";
import EmojiPicker from 'emoji-picker-react';
import _ from 'lodash';
import {v4 as uuidV4} from "uuid";

let recorder;

function ChatFooter() {
    const dispatch = useDispatch();
    const {friendId} = useParams();
    const textAreaRef = useRef(null);
    const friendTyping = useSelector(store => store.messages.friendTyping);
    const [files, setFiles] = useState([]);
    const [uploadProcess, setUploadProcess] = useState(100);
    const [recording, setRecording] = useState(false);
    const [message, setMessage] = useState({
        text: '',
        type: 'text',
    });

    const handleStartRecording = useCallback(async () => {
        let chunks = [];

        try {
            recorder = null;

            let stream = await navigator.mediaDevices.getUserMedia({audio: true});
            recorder = new MediaRecorder(stream);

            recorder.ondataavailable = (e) => {
                chunks.push(e.data);

                if (recorder.state === 'inactive') {
                    setFiles([new File(chunks, 'audio', {type: "audio/mp3"})]);
                    setMessage({text: '', type: 'voice'})
                }
            };

            recorder.start();
            setRecording(true);
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }, [recorder, recording]);

    const handleStopRecording = useCallback(() => {
        recorder.stop();
        setRecording(false);
    }, [recorder]);

    const handleSendMessage = useCallback(async (ev) => {
        if (ev) {
            ev.preventDefault();
        }

        if (!message.text.trim() && _.isEmpty(files)) {
            return;
        }

        await dispatch(sendMessageRequest({
            friendId,
            text: message.text,
            files,
            type: message.type,
            onUploadProcess: (ev) => {
                const {total, loaded} = ev;
                setUploadProcess(loaded / total * 100);
            }
        }));

        setMessage({
            text: '',
            type: 'text',
        });
        setFiles([]);
    }, [message, files, friendId]);

    const handleChangeFile = useCallback((e) => {
        const filesList = [...files];

        [...e.target.files].forEach((file) => {
            file._src = URL.createObjectURL(file);

            filesList.push(file);
        });

        if (filesList.length > 10) {
            toast.info('max files limit');
            filesList.length = 10;
        }

        setFiles(filesList);
        e.target.value = '';
    }, [files]);

    const handleDeleteFile = useCallback((index) => {
        files.splice(index, 1)
        setFiles([...files]);
    }, [files]);

    const handleKeyPress = useCallback(() => {
        dispatch(socketTypingRequest(friendId));
    }, [friendId]);

    const handleEmojiPress = useCallback((emoji) => {
        textAreaRef.current.focus();
        setMessage({
            ...message,
            text: message.text + emoji.emoji
        });
    }, [message]);

    return (
        <div className="card-footer">
            {uploadProcess !== 100 ? (
                <div className="upload-progress">
                    <div style={{width: `${uploadProcess}%`}}/>
                </div>
            ) : null}
            <div className='upload-file-wrapper'>
                {files.map((file, index) => (
                    <div key={file._src || uuidV4} className='upload-file'>
                        <p className="upload-file-text">
                            {file.type.startsWith('image/') ? (
                                <img width="100" height="100" src={file._src} alt=""/>
                            ) : null}
                            {file.type.startsWith('video/') ? (
                                <video width="100" height="100" src={file._src}/>
                            ) : null}
                            {!file.type.startsWith('image/') && !file.type.startsWith('video/') ? file.name : null}
                        </p>
                        <p
                            className="upload-file-close"
                            onClick={() => handleDeleteFile(index)}
                        >
                            X
                        </p>
                    </div>
                ))}
            </div>
            {
                recording ? (
                    <div className='record-anim-box'>
                        <span className='record-anim-span'></span>
                        <span className='record-anim-span'></span>
                        <span className='record-anim-span'></span>
                        <span className='record-anim-span'></span>
                        <span className='record-anim-span'></span>
                        <span className='record-anim-span'></span>
                        <span className='record-anim-span'></span>
                        <span className='record-anim-span'></span>
                        <span className='record-anim-span'></span>
                        <span className='record-anim-span'></span>
                    </div>
                ) : null
            }
            {friendTyping ? 'typing ...' : null}
            <form onSubmit={handleSendMessage} className="input-group">
                <div className="input-group-append">
                    <label className="input-group-text attach_btn">
                        <i className="fas fa-paperclip"></i>
                        <input
                            type="file"
                            name='file'
                            multiple
                            style={{display: 'none'}}
                            onChange={handleChangeFile}
                        />
                    </label>
                    <div className="emoji">
                        <div className="emoji-btn">
                            😌
                        </div>
                        <div className='emoji-picker'>
                            <EmojiPicker
                                width={300}
                                height={350}
                                searchDisabled
                                onEmojiClick={handleEmojiPress}
                            />
                        </div>
                    </div>
                </div>
                <textarea
                    value={message.text}
                    onKeyUp={handleKeyPress}
                    onChange={ev => setMessage({...message, text: ev.target.value})}
                    className="form-control type_msg"
                    placeholder="Type your message..."
                    ref={textAreaRef}
                />
                <div className="input-group-append">
                    {
                        recording ? (
                            <div
                                className="btn-voice"
                                onClick={handleStopRecording}
                            >
                                ⏹️
                            </div>
                        ) : (
                            <div
                                className="btn-voice"
                                onClick={handleStartRecording}
                            >
                                ▶️
                            </div>
                        )
                    }
                    <button className="input-group-text send_btn">
                        <i className="fas fa-location-arrow"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatFooter;
