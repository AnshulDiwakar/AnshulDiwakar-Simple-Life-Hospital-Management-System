import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    MenuItem,
    Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        gender: '',
        occupation: '',
        specialty: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isDoctor = formData.occupation === 'doctor';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const {
            fullName,
            username,
            email,
            gender,
            occupation,
            specialty,
            dateOfBirth,
            password,
            confirmPassword,
        } = formData;

        // Validate fields
        if (!fullName || !username || !email || !gender || !occupation || !dateOfBirth || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (isDoctor && !specialty) {
            setError('Specialty is required for doctors.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: fullName,
                    username,
                    email,
                    gender,
                    occupation,
                    specialty: isDoctor ? specialty : '',
                    date_of_birth: dateOfBirth,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Display API validation error or generic one
                const errMsg = data?.detail || Object.values(data).flat().join(' ') || 'Registration failed.';
                setError(errMsg);
            } else {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Register
                </Typography>

                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Full Name"
                        name="fullName"
                        fullWidth
                        margin="normal"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Username"
                        name="username"
                        fullWidth
                        margin="normal"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Gender"
                        name="gender"
                        select
                        fullWidth
                        margin="normal"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </TextField>
                    <TextField
                        label="Occupation"
                        name="occupation"
                        select
                        fullWidth
                        margin="normal"
                        value={formData.occupation}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="doctor">Doctor</MenuItem>
                        <MenuItem value="patient">Patient</MenuItem>
                    </TextField>
                    {isDoctor && (
                        <TextField
                            label="Specialty"
                            name="specialty"
                            fullWidth
                            margin="normal"
                            value={formData.specialty}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <TextField
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Register
                    </Button>
                </form>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Already have an account? <Link to="/login">Login here</Link>
                </Typography>
            </Box>
        </Container>
    );
}
