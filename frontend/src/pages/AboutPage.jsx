import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function AboutPage() {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h3" gutterBottom>
                About Simple Life Hospital
            </Typography>
            <Typography variant="body1" paragraph>
                Simple Life Hospital is dedicated to providing top quality healthcare with compassion and professionalism.
            </Typography>
            <Typography variant="body1" paragraph>
                Our team of experienced doctors and staff work tirelessly to ensure patient wellness and satisfaction.
            </Typography>
            <Box
                component="img"
                src="/images/hospital_team.jpg"
                alt="Hospital Team"
                sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 2, mt: 2 }}
            />
        </Container>
    );
}
