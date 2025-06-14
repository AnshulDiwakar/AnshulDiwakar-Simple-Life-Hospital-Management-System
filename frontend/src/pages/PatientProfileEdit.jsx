import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container, Typography, TextField, Button, Box,
} from '@mui/material';

export default function PatientProfileEdit() {
    const { id } = useParams();  // patient id from URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        // TODO: Replace this with API call to fetch patient data by id
        // Simulated fetch:
        const fetchPatient = () => ({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            address: '123 Main St, City',
        });

        const patientData = fetchPatient();
        setFormData(patientData);
    }, [id]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Make API call to update patient profile here
        console.log('Updated patient data:', formData);

        // After successful update, redirect to patient profile page
        navigate(`/patient/${id}`);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Edit Patient Profile</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                    Save Changes
                </Button>
            </Box>
        </Container>
    );
}
