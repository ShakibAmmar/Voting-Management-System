import React, { useState } from 'react';
import { DB } from '../data/database';
import Login from './Login';
import Register from './Register';
import VoterDashboard from './VoterDashboard';
import VotePage from './VotePage';
import AdminDashboard from './AdminDashboard';

const VotingSystem = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState('login');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = (username, password) => {
    setError('');
    const user = DB.users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setPage(user.role === 'admin' ? 'admin-dashboard' : 'voter-dashboard');
      setSuccess('Login successful!');
      setTimeout(() => setSuccess(''), 3000);
      return true;
    } else {
      setError('Invalid credentials');
      return false;
    }
  };

  const handleRegister = (username, password, confirmPassword) => {
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (DB.users.find(u => u.username === username)) {
      setError('Username already exists');
      return false;
    }
    const newUser = {
      id: DB.users.length + 1,
      username: username,
      password: password,
      role: 'voter',
      hasVoted: false
    };
    DB.users.push(newUser);
    setSuccess('Registration successful! Please login.');
    setTimeout(() => {
      setSuccess('');
      setPage('login');
    }, 2000);
    return true;
  };

  const handleVote = (candidateId) => {
    if (currentUser.hasVoted) {
      setError('You have already voted!');
      return false;
    }
    DB.votes.push({
      id: DB.votes.length + 1,
      userId: currentUser.id,
      candidateId: candidateId,
      electionId: 1,
      timestamp: new Date().toISOString()
    });
    const userIndex = DB.users.findIndex(u => u.id === currentUser.id);
    DB.users[userIndex].hasVoted = true;
    setCurrentUser({ ...currentUser, hasVoted: true });
    setSuccess('Vote cast successfully!');
    setTimeout(() => {
      setSuccess('');
      setPage('voter-dashboard');
    }, 2000);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setPage('login');
    setError('');
    setSuccess('');
  };

  const getResults = () => {
    const results = {};
    DB.votes.forEach(vote => {
      results[vote.candidateId] = (results[vote.candidateId] || 0) + 1;
    });
    return DB.candidates.map(c => ({
      ...c,
      votes: results[c.id] || 0
    })).sort((a, b) => b.votes - a.votes);
  };

  const commonProps = {
    error,
    success,
    setError,
    setSuccess,
    setPage
  };

  if (page === 'login') {
    return <Login {...commonProps} handleLogin={handleLogin} />;
  }

  if (page === 'register') {
    return <Register {...commonProps} handleRegister={handleRegister} />;
  }

  if (page === 'voter-dashboard') {
    return <VoterDashboard {...commonProps} currentUser={currentUser} logout={logout} />;
  }

  if (page === 'vote') {
    return <VotePage {...commonProps} handleVote={handleVote} />;
  }

  if (page === 'admin-dashboard') {
    return <AdminDashboard {...commonProps} currentUser={currentUser} logout={logout} getResults={getResults} />;
  }

  return null;
};

export default VotingSystem;