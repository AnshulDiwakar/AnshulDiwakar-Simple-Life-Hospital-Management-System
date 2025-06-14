import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button, CircularProgress, Alert } from '@mui/material';

export default function DoctorProfile() {
    const { id } = useParams(); // Doctor ID from URL
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch doctor data from backend API
        const fetchDoctor = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/doctors/${id}/`);
                if (!res.ok) throw new Error('Failed to load doctor data');
                const data = await res.json();
                setDoctor(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [id]);

    const handleBookAppointment = () => {
        navigate(`/appointment/${id}`);
    };

    if (loading) {
        return <Container sx={{ mt: 4 }}><CircularProgress /></Container>;
    }

    if (error || !doctor) {
        return <Container sx={{ mt: 4 }}><Alert severity="error">{error || 'Doctor not found'}</Alert></Container>;
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    <img
                        src={doctor.photo || '/default-doctor.png'}
                        alt={doctor.name}
                        style={{ width: 200, height: 200, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <Box>
                        <Typography variant="h4" gutterBottom>{doctor.name}</Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Specialty: {doctor.specialty}
                        </Typography>
                        <Typography paragraph>{doctor.bio}</Typography>
                        <Typography variant="subtitle1">
                            Consultation Price: ${doctor.consultation_price}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                            onClick={handleBookAppointment}
                        >
                            Book Appointment
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
