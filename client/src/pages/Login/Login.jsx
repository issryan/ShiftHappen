import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
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
            localStorage.setItem('token', response.data.token);
            console.log('Login success:', response.data);
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : 'Error');
        }
    };

    const handleGoogleSuccess = (credentialResponse) => {
        console.log('Google sign in success:', credentialResponse);
        axios.post('/api/auth/google-login', {
            token: credentialResponse.credential
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            console.log('Google login success:', response.data);
        }).catch(error => {
            console.error('Google login error:', error.response ? error.response.data : 'Error');
        });
    };

    const handleGoogleFailure = (error) => {
        console.error('Google sign in failed:', error);
    };

    return (
        <GoogleOAuthProvider clientId="911284722127-14sd362a81ncfmq8e42qrhoo897dt737.apps.googleusercontent.com">
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
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                        useOneTap
                        className="google-login-btn"
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default Login;