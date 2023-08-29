import React, { useState } from 'react';
import styles from './Login.module.css'; // Import the CSS module

function Login({ onLogin }) {
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleTokenChange = (event) => {
        setToken(event.target.value);
        setErrorMessage(''); // Clear error message when token changes
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Here, you would typically make an API request to validate the token
        // and perform the login. For the sake of example, let's just validate
        // a hardcoded token "fakeToken123".

        if (token === 'fakeToken123') {
            onLogin(token); // Call the onLogin callback with the token
        } else {
            setErrorMessage('Invalid token. Please try again.');
        }
    };

    return (
        <section className={styles.section}>
            <span></span>
            <div className={`${styles.signin} ${styles.loginContainer}`}>
                <div className={styles.content}>
                    <h2>Login In</h2>
                    <div className={styles.form}>
                        <div className={styles.inputBox}>
                            <input
                                type="text"
                                required
                                value={token}
                                onChange={handleTokenChange}
                                placeholder="Enter token"
                            />
                        </div>
                        <div className={styles.instructions}>
                            <i>Input: fakeToken123</i>
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type="submit"
                                value="Login"
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;



