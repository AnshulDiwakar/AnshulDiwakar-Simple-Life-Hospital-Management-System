import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Step 1: Request tokens
            const tokenRes = await fetch(`${process.env.REACT_APP_API_URL}/api/token/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!tokenRes.ok) {
                const err = await tokenRes.json();
                throw new Error(err.detail || 'Invalid login credentials');
            }

            const { access, refresh } = await tokenRes.json();
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            // Step 2: Get user profile
            const profileRes = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`,
                },
            });

            if (!profileRes.ok) throw new Error('Failed to load profile');

            const profile = await profileRes.json();

            // Step 3: Redirect based on role
            if (profile.role === 'doctor') {
                navigate(`/doctor/${profile.id}`);
            } else if (profile.role === 'patient') {
                navigate(`/patient/${profile.id}`);
            } else {
                navigate('/profile'); // fallback route
            }

        } catch (error) {
            console.error('Login error:', error);
            setError(error.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
