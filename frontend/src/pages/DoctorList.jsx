import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import doctor1 from '../assets/doctors/doctor1.jpeg';
import doctor2 from '../assets/doctors/doctor2.jpg';
import doctor3 from '../assets/doctors/doctor3.jpeg';
import doctor4 from '../assets/doctors/doctor4.jpg';
import doctor5 from '../assets/doctors/doctor5.jpg';
import doctor6 from '../assets/doctors/doctor6.jpg';
import doctor7 from '../assets/doctors/doctor7.jpg';
import doctor8 from '../assets/doctors/doctor8.jpg';
import doctor9 from '../assets/doctors/doctor9.jpg';
import doctor10 from '../assets/doctors/doctor10.jpg';
import doctor11 from '../assets/doctors/doctor11.jpg';
import doctor12 from '../assets/doctors/doctor12.jpg';
import doctor13 from '../assets/doctors/doctor13.jpg';

const doctorsData = [
    { id: 1, name: 'Dr. John Smith', specialty: 'Cardiologist', photo: doctor1 },
    { id: 2, name: 'Dr. Jane Doe', specialty: 'Dermatologist', photo: doctor2 },
    { id: 3, name: 'Dr. Alice Johnson', specialty: 'Pediatrician', photo: doctor3 },
    { id: 4, name: 'Dr. Michael Chen', specialty: 'Neurologist', photo: doctor4 },
    { id: 5, name: 'Dr. Sarah Williams', specialty: 'Orthopedic Surgeon', photo: doctor5 },
    { id: 6, name: 'Dr. Robert Garcia', specialty: 'Ophthalmologist', photo: doctor6 },
    { id: 7, name: 'Dr. Emily Wilson', specialty: 'Psychiatrist', photo: doctor7 },
    { id: 8, name: 'Dr. David Kim', specialty: 'Endocrinologist', photo: doctor8 },
    { id: 9, name: 'Dr. Olivia Brown', specialty: 'Gastroenterologist', photo: doctor9 },
    { id: 10, name: 'Dr. James Taylor', specialty: 'Pulmonologist', photo: doctor10 },
    { id: 11, name: 'Dr. Sophia Martinez', specialty: 'Rheumatologist', photo: doctor11 },
    { id: 12, name: 'Dr. William Lee', specialty: 'Urologist', photo: doctor12 },
    { id: 13, name: 'Dr. Emma Davis', specialty: 'Oncologist', photo: doctor13 }
];

export default function DoctorList() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        setDoctors(doctorsData);
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Our Doctors</Typography>
            <Grid container spacing={4}>
                {doctors.map((doc) => (
                    <Grid item key={doc.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={doc.photo}
                                alt={doc.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{doc.name}</Typography>
                                <Typography color="text.secondary">{doc.specialty}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    component={Link}
                                    to={`/appointment/${doc.id}`}
                                    variant="contained"
                                    color="primary"
                                >
                                    Book Appointment
                                </Button>
                                <Button
                                    size="small"
                                    component={Link}
                                    to={`/doctor/${doc.id}`}
                                >
                                    View Profile
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
