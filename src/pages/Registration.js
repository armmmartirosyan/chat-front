import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {registerRequest} from "../store/actions/users";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import WrapperLogOut from "../components/WrapperLogOut";

function Registration() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChangeValues = useCallback((key, val) => {
        setValues({...values, [key]: val});
        setErrors({...errors, [key]: null});
    }, [values, errors]);

    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        const data = await dispatch(registerRequest(values));

        if (data.payload && data.payload.data && data.payload.data.status != 'ok') {
            setErrors(data.payload.data.errors)
        }

        if (data.payload && data.payload.data && data.payload.data.status === 'ok') {
            toast.success(
                'User registered',
                {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );

            navigate('/login');
        }
    }, [values, navigate]);

    return (
        <WrapperLogOut>
            <div className="login-page">
                <div className="form">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={values.firstName}
                            onChange={(ev) => handleChangeValues('firstName', ev.target.value)}
                            placeholder="firstname"
                        />
                        {/*<p>{errors.firstName}</p>*/}
                        <input
                            type="text"
                            value={values.lastName}
                            onChange={(ev) => handleChangeValues('lastName', ev.target.value)}
                            placeholder="lastname"
                        />
                        <input
                            type="text"
                            value={values.email}
                            onChange={(ev) => handleChangeValues('email', ev.target.value)}
                            placeholder="email"
                        />
                        {/*<p>{errors.email}</p>*/}

                        <input
                            type="password"
                            value={values.password}
                            onChange={(ev) => handleChangeValues('password', ev.target.value)}
                            placeholder="password"/>
                        <button>Create</button>
                        <p className="message">Already registered? <Link to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
        </WrapperLogOut>
    );
}

export default Registration;
