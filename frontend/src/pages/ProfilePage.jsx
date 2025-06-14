import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) return navigate('/login');
        fetch(`${process.env.REACT_APP_API_URL}/api/profile/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setUser);

        fetch(`${process.env.REACT_APP_API_URL}/api/profile/appointments/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setAppointments);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <Container sx={{ mt: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4">Profile</Typography>
                <Typography><strong>Username:</strong> {user.username}</Typography>
                <Typography><strong>Email:</strong> {user.email}</Typography>
                <Typography><strong>Role:</strong> {user.role}</Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>Logout</Button>
            </Paper>

            <Typography variant="h5" sx={{ mt: 4 }}>Your Appointments</Typography>
            <List>
                {appointments.map(a => (
                    <ListItem key={a.id}>
                        {a.date} {a.time} with doctor #{a.doctor}
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/doctors')}>
                Book New Appointment
            </Button>
        </Container>
    );
}
