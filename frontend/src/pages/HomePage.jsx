import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, Grid, Card, CardContent, CardMedia, Button, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import FavoriteIcon from '@mui/icons-material/Favorite';

import hospitalPhoto from '../assets/hospital1.jpg';
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

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HomePage() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        setDoctors([
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


        ]);
    }, []);

    const features = [
        {
            title: "Expert Doctors",
            description: "Meet our highly qualified medical staff ready to serve you.",
            icon: <MedicalServicesIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
            quote: "“Healing hands with compassionate hearts.”",
            link: "/doctors",
            linkText: "Meet Our Doctors"
        },
        {
            title: "Advanced Equipment",
            description: "We use state-of-the-art technology for accurate diagnosis and treatment.",
            icon: <PrecisionManufacturingIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
            quote: "“Innovation at the core of every diagnosis.”",
            link: "/about",
            linkText: "Learn More"
        },
        {
            title: "Compassionate Care",
            description: "Our team is dedicated to providing personalized and compassionate patient care.",
            icon: <FavoriteIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
            quote: "“Caring for you like family.”",
            link: "/contact",
            linkText: "Contact Us"
        },
    ];

    return (
        <>
            <Box
                sx={{
                    height: '60vh',
                    backgroundImage: `url(${hospitalPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
                    mb: 4,
                }}
            >
                <Typography variant="h2" component="h1" align="center" sx={{ fontWeight: 'bold' }}>
                    Welcome to Simple Life Hospital
                </Typography>
            </Box>

            <Container maxWidth="lg" sx={{ mb: 6 }}>
                <Grid container spacing={4}>
                    {features.map(({ title, description, icon, quote, link, linkText }, index) => (
                        <Grid
                            item
                            xs={12}
                            md={4}
                            key={title}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <Box
                                sx={{
                                    p: 3,
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: 6,
                                    }
                                }}
                            >
                                <Box sx={{ mb: 2 }}>{icon}</Box>
                                <Typography variant="h5" gutterBottom>{title}</Typography>
                                <Typography>{description}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 2 }}>
                                    {quote}
                                </Typography>
                                <MuiLink
                                    component={Link}
                                    to={link}
                                    sx={{
                                        display: 'inline-block',
                                        mt: 3,
                                        textDecoration: 'none',
                                        color: '#1976d2',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    {linkText}
                                </MuiLink>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="lg" sx={{ mb: 6 }}>
                <Typography variant="h4" gutterBottom>Featured Doctors</Typography>
                <Grid container spacing={3}>
                    {doctors.map((doc, index) => (
                        <Grid
                            item
                            xs={12}
                            md={4}
                            key={doc.id}
                            data-aos="zoom-in"
                            data-aos-delay={index * 100}
                        >
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={doc.photo}
                                    alt={doc.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{doc.name}</Typography>
                                    <Typography color="text.secondary" gutterBottom>{doc.specialty}</Typography>
                                    <Button
                                        component={Link}
                                        to={`/doctor/${doc.id}`}
                                        variant="outlined"
                                        sx={{ mt: 1 }}
                                    >
                                        View Profile
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
