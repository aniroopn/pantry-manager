import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError(''); // Clear any previous error

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/pantry'); // Redirect to pantry manager after successful sign-up
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(to right, #FFA07A, #FF6347)', // Gradient background
        padding: 2,
        borderRadius: 2,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography variant="h3" color="#ffffff" gutterBottom>
        Sign Up
      </Typography>
      <Box
        width="100%"
        maxWidth="400px"
        padding={3}
        bgcolor="#ffffff"
        borderRadius={2}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      >
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
        <Button
          variant="contained"
          onClick={handleSignUp}
          sx={{
            backgroundColor: '#FF6347', // Button color
            '&:hover': { backgroundColor: '#FF4500' },
            width: '100%',
            padding: 1.5,
            borderRadius: 2,
          }}
        >
          Sign Up
        </Button>
        <Typography sx={{ marginTop: 2, textAlign: 'center' }}>
          Already have an account? <Link href="/" sx={{ color: '#FF6347' }}>Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;