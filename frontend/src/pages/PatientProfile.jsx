import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';

export default function PatientProfile() {
    const { id } = useParams(); // Patient ID from URL
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/patients/${id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.detail || 'Failed to load patient profile');
                }

                const data = await res.json();
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (loading) {
        return <Container sx={{ mt: 4 }}><CircularProgress /></Container>;
    }

    if (error) {
        return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>Patient Profile</Typography>
            <Box>
                <Typography><strong>Name:</strong> {profile.name}</Typography>
                <Typography><strong>Email:</strong> {profile.email}</Typography>
                <Typography><strong>Age:</strong> {profile.age}</Typography>
            </Box>
        </Container>
    );
}
