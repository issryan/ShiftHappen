import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import './Login.css';

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
            // Optionally redirect the user or show a success message
        } catch (error) {
            console.error('Sign up error:', error.response ? error.response.data : 'Error');
            // Optionally show an error message to the user
        }
    };

    const handleGoogleSuccess = async (response) => {
        try {
            const googleToken = response.tokenId;
            const googleResponse = await axios.post('/api/auth/google-signin', {
                token: googleToken
            });
            console.log('Google sign in success:', googleResponse.data);
            // Optionally redirect the user or handle session
        } catch (error) {
            console.error('Google sign in error:', error.response ? error.response.data : 'Error');
            // Optionally show an error message to the user
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google sign in failed:', error);
        // Optionally alert the user or log these errors
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"
                buttonText="Sign Up with Google"
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={'single_host_origin'}
            />
            <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
    );
}

export default SignUp;
