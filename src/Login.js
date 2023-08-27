import React, { useState } from 'react';
import './style.css'; // Import your CSS file

function Login({ onLogin }) {
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Here, you would typically make an API request to validate the token
        // and perform the login. For the sake of example, let's just validate
        // a hardcoded token "fakeToken123".

        if (token === 'fakeToken123') {
            onLogin(token);
        } else {
            setErrorMessage('Invalid token. Please try again.');
        }
    };

    return (
        <div className="section">
            <span></span>
            <div className="signin">
                <div className="content">
                    <h2>Sign In</h2>
                    <div className="form">
                        <div className="inputBox">
                            <input
                                type="text"
                                required
                                value={token}
                                onChange={handleTokenChange}
                            />
                            <i>Input: fakeToken123</i>
                        </div>
                        <div className="inputBox">
                            <input
                                type="submit"
                                value="Login"
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;


