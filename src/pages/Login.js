import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import WrapperLogOut from "../components/WrapperLogOut";
import {useDispatch} from "react-redux";
import {loginRequest} from "../store/actions/users";
import {toast} from "react-toastify";

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();

        const data = await dispatch(loginRequest({
            email, password, remember
        }));

        if (data.error) {
            toast.error('Invalid Username or password')
        }
    }, [email, password, remember]);

    return (
        <WrapperLogOut>
            <div className="login-page">
                <div className="form">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            placeholder="username"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                            placeholder="password"/>
                        <button>Login</button>
                        <label className="remember">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                            />
                            Remember me
                        </label>
                        <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
                    </form>
                </div>
            </div>
        </WrapperLogOut>
    );
}

export default Login;
