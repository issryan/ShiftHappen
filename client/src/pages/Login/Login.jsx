import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password
            });
            console.log('Login success:', response.data);
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : 'Error');
        }
    };

    const handleGoogleSuccess = (response) => {
        console.log('Google sign in success:', response);
    };

    const handleGoogleFailure = (error) => {
        console.error('Google sign in failed:', error);
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-container">
                <h2>Log In</h2>
                <p>Don’t have an account? <a href="/signup">Sign Up</a></p>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Log In</button>
                </form>
                <GoogleLogin
                    clientId=" " 
                    buttonText="Continue with Google"
                    onSuccess={handleGoogleSuccess}
                    onFailure={handleGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                    className="google-login-btn"
                />
            </div>
        </div>
    );
}

export default Login;
