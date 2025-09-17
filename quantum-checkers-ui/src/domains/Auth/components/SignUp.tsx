import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import BackButton from '../../../shared/components/MenuButton/BackButton';


const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const csrfToken = cookies.get('csrftoken');

        try {
            const response = await fetch('http://localhost:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken || '',
                },
                credentials: 'include', // 保证cookies能够在请求中被发送
                body: JSON.stringify({ username, password, email }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Signup failed');
            }

            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div style={{ color: 'var(--color-text)', backgroundColor: 'var(--color-background)', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <h2 style={{ fontSize: '35px', padding: '20px' }}>Sign Up</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '12px' }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', margin: '12px' }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', margin: '12px' }}>
                    <label htmlFor="email" style={{ fontSize: '20px', fontWeight: 'bold' }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginTop: '15px', padding: '13px', border: '1px solid #ccc', borderRadius: '6.5px' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{ fontWeight: 'bold', padding: '13px 15px', backgroundColor: 'var(--color-secondary)', color: 'var(--color-box-background)', border: 'none', borderRadius: '6.5px', cursor: 'pointer', transition: 'background-color 0.2s', fontSize: '1.3rem', margin: '15px', minWidth: '200px', maxWidth: '250px' }}
                >
                    Sign Up
                </button>
            </form>
            <div style={{ margin: '30px' }} >
                <BackButton />
            </div>
        </div>
    );
};

export default SignUp;
