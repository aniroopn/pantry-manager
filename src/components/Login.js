import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(''); // Clear any previous error

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/pantry');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login. Please check your email and password.');
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
        background: 'linear-gradient(to right, #FF6F61, #FF3E30)', // Red gradient background
        padding: 2,
        borderRadius: 2,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography variant="h3" color="#ffffff" gutterBottom>
        Login
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
          onClick={handleLogin}
          sx={{
            backgroundColor: '#FF3E30', // Button color
            '&:hover': { backgroundColor: '#FF2D1A' },
            width: '100%',
            padding: 1.5,
            borderRadius: 2,
          }}
        >
          Login
        </Button>
        <Typography sx={{ marginTop: 2, textAlign: 'center' }}>
          Don't have an account? <Link href="/signup" sx={{ color: '#FF3E30' }}>Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;