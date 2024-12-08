import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      // Tampilkan alert ketika berhasil register
      alert('Registration successful! You can now login.');
      
      // Arahkan ke halaman login
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please check your input.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://i.ibb.co.com/1fJpFhJ/Whats-App-Image-2024-12-08-at-10-26-07-PM.jpg')" }}>
      <div
        className="bg-black p-8 rounded-lg shadow-md w-96 bg-cover bg-center"
        // style={{ backgroundImage: "url('https://i.pinimg.com/736x/04/48/6e/04486e81a5a2692e8f0b65a9a4b6db73.jpg')" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-opacity-50 bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-opacity-50 bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-opacity-50 bg-white"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#c2410c] text-white py-2 rounded w-full hover:bg-[#c2410c]"
          >
            Register
          </button>
        </form>
        <p className="text-white text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-[#c2410c] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
