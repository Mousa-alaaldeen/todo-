import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import ToggleButtons from './ToggleButton';
import Todo from './Todo'

export default function TodoList() {
    return (
        <Container maxWidth="sm">
            <Card sx={{ backgroundColor: '#333333', p: 2 }}>
                <CardContent sx={{ backgroundColor: '#333333' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <Typography gutterBottom variant="h3" component="div" sx={{ color: 'white' }}>
                            Todo List
                        </Typography>

                        {/* Toggle Button */}
                        <ToggleButtons />
                        {/* =========Toggle Button========= */}

                        {/* Todo List */}
                        <Todo />
                        {/* ===================Todo List========= */}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}
