import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    if (document.cookie) {
        const token = document.cookie.split(';').find(x => x.trim().startsWith('token'));
        if (token) {
            history.push("/todo");
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const backendUrl = process.env.REACT_APP_BACK_END_URL || "http://localhost:3002";

            const { data } = await axios.post(
                `${backendUrl}/api/users/signin`,
                { email, password }
            );
            document.cookie = `token=${data.token}`;
            props.history.push("/todo");

        } catch (err) {
            setError(err.response.data);
        }


    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {error && <div className="danger">{error}</div>}
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer? <Link to="/registration" className="link primary">Create-your-account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
