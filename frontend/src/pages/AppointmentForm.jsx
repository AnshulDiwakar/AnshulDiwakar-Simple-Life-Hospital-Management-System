import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Typography,
    Button,
    Box,
    Paper,
    CircularProgress,
    Alert
} from '@mui/material';
import { useParams } from 'react-router-dom';

export default function AppointmentForm() {
    const { doctorId } = useParams();

    const [formData, setFormData] = useState({
        patientName: '',
        email: '',
        date: '',
        time: '',
        description: '',
    });

    const [doctorName, setDoctorName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Dummy doctor data (replace with API call if needed)
        const dummyDoctors = [
            { id: '1', name: 'Dr. John Smith' },
            { id: '2', name: 'Dr. Jane Doe' },
            { id: '3', name: 'Dr. Alice Johnson' },
        ];
        const doctor = dummyDoctors.find(d => d.id === doctorId);
        if (doctor) setDoctorName(doctor.name);
    }, [doctorId]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        const token = localStorage.getItem('access_token');
        if (!token) {
            setError('You must be logged in to book an appointment.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/appointments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // ✅ Include access token in Authorization header
                },
                body: JSON.stringify({
                    patient_name: formData.patientName.trim(),
                    email: formData.email.trim(),
                    date: formData.date,
                    time: formData.time,
                    description: formData.description,
                    doctor: parseInt(doctorId, 10),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('API Error Response:', data);
                throw new Error(data.detail || 'Failed to submit appointment');
            }

            setMessage(`Appointment successfully booked with ${doctorName || `Doctor #${doctorId}`}`);
            setFormData({
                patientName: '',
                email: '',
                date: '',
                time: '',
                description: '',
            });
        } catch (err) {
            setError(err.message || 'An error occurred while submitting the appointment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Book Appointment {doctorName ? `with ${doctorName}` : `with Doctor #${doctorId}`}
                </Typography>

                {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        name="patientName"
                        label="Your Name"
                        value={formData.patientName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        name="date"
                        label="Appointment Date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        fullWidth
                        name="time"
                        label="Appointment Time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        fullWidth
                        name="description"
                        label="Reason for Visit"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2 }}
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Appointment'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
