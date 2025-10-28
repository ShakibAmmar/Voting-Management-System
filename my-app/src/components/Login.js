import React, { useState } from 'react';

const Login = ({ error, success, setPage, handleLogin }) => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const onSubmit = () => {
    handleLogin(loginForm.username, loginForm.password);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 style={styles.title}>Voting System</h1>
          <p style={styles.subtitle}>Secure & Transparent Elections</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            ❌ {error}
          </div>
        )}

        {success && (
          <div style={styles.successBox}>
            ✅ {success}
          </div>
        )}

        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              style={styles.input}
            />
          </div>
          <button onClick={onSubmit} style={styles.button}>
            Login
          </button>
        </div>

        <div style={styles.footer}>
          <button onClick={() => setPage('register')} style={styles.linkButton}>
            Don't have an account? Register here
          </button>
        </div>

        <div style={styles.demoBox}>
          <p style={styles.demoTitle}>Demo Credentials:</p>
          <p style={styles.demoText}>Admin: admin / admin123</p>
          <p style={styles.demoText}>Voters: voter1 to voter10 / voter123</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '450px',
    padding: '40px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  iconContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    backgroundColor: '#EBF4FF',
    borderRadius: '50%',
    marginBottom: '20px'
  },
  icon: {
    width: '32px',
    height: '32px',
    color: '#3B82F6'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '10px'
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '16px'
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    border: '1px solid #FCA5A5',
    color: '#991B1B',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  successBox: {
    backgroundColor: '#D1FAE5',
    border: '1px solid #6EE7B7',
    color: '#065F46',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  formContainer: {
    marginBottom: '20px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s'
  },
  button: {
    width: '100%',
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px'
  },
  linkButton: {
    color: '#3B82F6',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  demoBox: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#F9FAFB',
    borderRadius: '8px'
  },
  demoTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: '8px'
  },
  demoText: {
    fontSize: '12px',
    color: '#6B7280',
    marginBottom: '4px'
  }
};

export default Login;