import React, { useState } from 'react';

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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Token:
                        <input
                            type="text"
                            value={token}
                            onChange={handleTokenChange}
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default Login;
