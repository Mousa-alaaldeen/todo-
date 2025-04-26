import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import CheckIcon from '@mui/icons-material/Check';
import { Container, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function Todo() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }} >
      <Card className='todoCard' sx={{ minWidth: 275, backgroundColor: '#2c2c2c', borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: '#ffffff' }}>
                Todo
              </Typography>
              <Typography variant="body2" sx={{ color: '#cccccc' }}>
                Hello World
              </Typography>
            </Grid>

            <Grid item>
              <Stack direction="row" spacing={1}>
                <IconButton className='iconButton' aria-label="check" sx={{ color: '#00e676', border: '1px solid #00e676' }}>
                  <CheckIcon />
                </IconButton>
                <IconButton className='iconButton' aria-label="alarm" sx={{ color: '#2979ff', border: '1px solid #2979ff' }}>
                  <EditIcon />
                </IconButton>
                <IconButton className='iconButton' aria-label="delete" sx={{ color: '#ff1744', border: '1px solid #ff1744' }}>
                  <DeleteIcon />
                </IconButton>
               
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
