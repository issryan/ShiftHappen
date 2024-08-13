import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './SignUp.css';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/register', {
                email,
                password
            });
            console.log('Sign up success:', response.data);
        } catch (error) {
            console.error('Sign up error:', error.response ? error.response.data : 'Error');
        }
    };

    const handleGoogleSuccess = (credentialResponse) => {
        console.log('Google sign in success:', credentialResponse);
        axios.post('/api/auth/google-register', {
            token: credentialResponse

                .credential
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            console.log('Google registration success:', response.data);
        }).catch(error => {
            console.error('Google registration error:', error.response ? error.response.data : 'Error');
        });
    };

    const handleGoogleFailure = (error) => {
        console.error('Google sign in failed:', error);
    };

    return (
        <GoogleOAuthProvider clientId="911284722127-14sd362a81ncfmq8e42qrhoo897dt737.apps.googleusercontent.com">
            <div className="signup-wrapper">
                <div className="signup-container">
                    <h2>Create an Account</h2>
                    <p>Have an Account? <a href="/login">Sign In</a></p>
                    <form onSubmit={handleSignUp}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Enter Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Create Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">Create Account</button>
                    </form>
                    <p className="terms">By creating an account, you agree to our <a href="/terms">Terms of Service</a>.</p>
                    <div className="social-logins">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}
                            useOneTap
                            className="google-login-btn"
                        />
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default SignUp;