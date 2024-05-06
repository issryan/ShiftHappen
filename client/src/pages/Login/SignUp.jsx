import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
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

    const handleGoogleSuccess = (response) => {
        console.log('Google sign in success:', response);
    };

    const handleGoogleFailure = (error) => {
        console.error('Google sign in failed:', error);
    };

    return (
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
                        clientId=" " //add client ID later
                        buttonText="Continue with Google"
                        onSuccess={handleGoogleSuccess}
                        onFailure={handleGoogleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
