import React from 'react';
import { DB } from '../data/database';

const VoterDashboard = ({ success, currentUser, logout, setPage }) => {
  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.navLeft}>
            <span style={styles.logo}>🗳️ Voting System</span>
          </div>
          <div style={styles.navRight}>
            <span style={styles.username}>Welcome, {currentUser.username}</span>
            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={styles.content}>
        {success && (
          <div style={styles.successBox}>
            ✅ {success}
          </div>
        )}

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Your Status</p>
                <p style={styles.statValue}>
                  {currentUser.hasVoted ? 'Voted' : 'Not Voted'}
                </p>
              </div>
              <div style={styles.statIcon}>
                {currentUser.hasVoted ? '✅' : '🔒'}
              </div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Active Elections</p>
                <p style={styles.statValue}>
                  {DB.elections.filter(e => e.status === 'active').length}
                </p>
              </div>
              <div style={styles.statIcon}>📊</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Total Candidates</p>
                <p style={styles.statValue}>{DB.candidates.length}</p>
              </div>
              <div style={styles.statIcon}>👥</div>
            </div>
          </div>
        </div>

        <div style={styles.electionCard}>
          <h2 style={styles.electionTitle}>Active Elections</h2>
          {DB.elections.filter(e => e.status === 'active').map(election => (
            <div key={election.id} style={styles.electionItem}>
              <h3 style={styles.electionName}>{election.title}</h3>
              <p style={styles.electionDesc}>{election.description}</p>
              <div style={styles.electionDates}>
                <span>Start: {election.startDate}</span>
                <span style={{ marginLeft: '20px' }}>End: {election.endDate}</span>
              </div>
              <button
                onClick={() => setPage('vote')}
                disabled={currentUser.hasVoted}
                style={currentUser.hasVoted ? styles.voteButtonDisabled : styles.voteButton}
              >
                {currentUser.hasVoted ? 'Already Voted' : 'Cast Your Vote'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F3F4F6'
  },
  nav: {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '16px 0'
  },
  navContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1F2937'
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  username: {
    color: '#374151'
  },
  logoutBtn: {
    backgroundColor: '#EF4444',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500'
  },
  content: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 20px'
  },
  successBox: {
    backgroundColor: '#D1FAE5',
    border: '1px solid #6EE7B7',
    color: '#065F46',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '24px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  statContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statLabel: {
    color: '#6B7280',
    fontSize: '14px',
    marginBottom: '8px'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1F2937'
  },
  statIcon: {
    fontSize: '48px'
  },
  electionCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '24px'
  },
  electionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '24px'
  },
  electionItem: {
    borderBottom: '1px solid #E5E7EB',
    paddingBottom: '24px',
    marginBottom: '24px'
  }
}

export default VoterDashboard;