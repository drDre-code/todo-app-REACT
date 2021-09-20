import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegistrationScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password are not the same');
        } else {
            try {
                const backendUrl = process.env.REACT_APP_BACK_END_URL;
                const { data } = await axios.post(
                    `${backendUrl}/api/users/registration`,
                    { name, email, password }
                );
                document.cookie = `token=${data.token}`;
                props.history.push("/todo");

            } catch (err) {
                const message = err.message.data || err.message;
                setError(message);
            }
        }
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>

                <div>
                    <h1>Create Account</h1>
                </div>

                {error && <div variant="danger">{error}</div>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
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
                    <label htmlFor="confirmPassword">Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Enter confirm password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button type="submit">
                        Register
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account? <Link to="/signin" className="link primary">Sign-In</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
