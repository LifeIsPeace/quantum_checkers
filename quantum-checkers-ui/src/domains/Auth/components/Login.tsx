import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Cookies from 'universal-cookie';
import BackButton from '../../../shared/components/MenuButton/BackButton';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const cookies = new Cookies();
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const csrfToken = cookies.get('csrftoken');

        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken || '',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error || 'Login failed. Please try again.';
                setError(errorMessage);
                return;
            }

            const responseData = await response.json();
            setIsAuthenticated(true);
            navigate('/test');
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ color: 'var(--color-text)', backgroundColor: 'var(--color-background)', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <h2 style={{ fontSize: '35px', padding: '20px' }}>Login</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <div style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
                    <label htmlFor="username" style={{ fontSize: '20px', fontWeight: 'bold' }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ marginTop: '15px', padding: '13px', border: '1px solid #ccc', borderRadius: '6.5px' }}
                    />
                </div>
               <div style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
                    <label htmlFor="password" style={{ fontSize: '20px', fontWeight: 'bold' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ marginTop: '15px', padding: '13px', border: '1px solid #ccc', borderRadius: '6.5px' }}
                    />
               </div>

               <button type="submit" style={{ fontWeight: 'bold', padding: '10px', backgroundColor: 'var(--color-secondary)', color: 'var(--color-box-background)', border: 'none', borderRadius: '6.5px', cursor: 'pointer', transition: 'background-color 0.2s', fontSize: '1.3rem', margin: '15px', minWidth: '200px', maxWidth: '250px' }}>Login</button>

               <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
                    <p style={{ fontSize: '16px' }}>Don't Have An Account?</p>
                    <button type="button" onClick={() => navigate('/signup')} style={{ fontWeight: 'bold', padding: '13px 15px', backgroundColor: 'var(--color-secondary)', color: 'var(--color-box-background)', border: 'none', borderRadius: '6.5px', cursor: 'pointer', transition: 'background-color 0.2s', fontSize: '1.3rem', margin: '5px', minWidth: '200px', maxWidth: '250px' }}>Sign Up</button>
               </div>
            </form>
            <div style={{ margin: '10px' }}>
               <BackButton />
            </div>
        </div>
    );
};

export default Login;
