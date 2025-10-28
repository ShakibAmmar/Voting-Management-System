import React from 'react';
import { DB } from '../data/database';

const AdminDashboard = ({ currentUser, logout, getResults }) => {
  const results = getResults();
  const totalVotes = DB.votes.length;

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.navLeft}>
            <span style={styles.logo}>🛡️ Admin Dashboard</span>
          </div>
          <div style={styles.navRight}>
            <span style={styles.username}>Admin: {currentUser.username}</span>
            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Total Voters</p>
                <p style={styles.statValue}>
                  {DB.users.filter(u => u.role === 'voter').length}
                </p>
              </div>
              <div style={styles.statIcon}>👥</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Total Votes</p>
                <p style={styles.statValue}>{totalVotes}</p>
              </div>
              <div style={styles.statIcon}>🗳️</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Candidates</p>
                <p style={styles.statValue}>{DB.candidates.length}</p>
              </div>
              <div style={styles.statIcon}>👤</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Elections</p>
                <p style={styles.statValue}>{DB.elections.length}</p>
              </div>
              <div style={styles.statIcon}>📊</div>
            </div>
          </div>
        </div>

        <div style={styles.resultsCard}>
          <h2 style={styles.sectionTitle}>Election Results</h2>
          <div style={styles.resultsContainer}>
            {results.map((candidate, index) => {
              const percentage = totalVotes > 0 ? (candidate.votes / totalVotes * 100).toFixed(1) : 0;
              return (
                <div key={candidate.id} style={styles.resultItem}>
                  <div style={styles.resultHeader}>
                    <div style={styles.resultLeft}>
                      <span style={styles.rank}>#{index + 1}</span>
                      <div>
                        <h3 style={styles.candidateName}>{candidate.name}</h3>
                        <p style={styles.candidateParty}>{candidate.party}</p>
                      </div>
                    </div>
                    <div style={styles.resultRight}>
                      <p style={styles.voteCount}>{candidate.votes}</p>
                      <p style={styles.percentage}>{percentage}%</p>
                    </div>
                  </div>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${percentage}%`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.votersCard}>
          <h2 style={styles.sectionTitle}>Registered Voters</h2>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Username</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Voting Status</th>
                </tr>
              </thead>
              <tbody>
                {DB.users.map(user => (
                  <tr key={user.id} style={styles.tableRow}>
                    <td style={styles.td}>{user.id}</td>
                    <td style={styles.td}>{user.username}</td>
                    <td style={styles.td}>
                      <span style={user.role === 'admin' ? styles.badgeAdmin : styles.badgeVoter}>
                        {user.role}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {user.role === 'voter' ? (
                        user.hasVoted ? (
                          <span style={styles.statusVoted}>✅ Voted</span>
                        ) : (
                          <span style={styles.statusNotVoted}>❌ Not Voted</span>
                        )
                      ) : (
                        <span style={styles.statusNA}>N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1F2937'
  },
  statIcon: {
    fontSize: '48px'
  },
  resultsCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '24px',
    marginBottom: '32px'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '24px'
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  resultItem: {
    borderBottom: '1px solid #E5E7EB',
    paddingBottom: '16px'
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  resultLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  rank: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#9CA3AF'
  },
  candidateName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: '4px'
  },
  candidateParty: {
    fontSize: '14px',
    color: '#6B7280'
  },
  resultRight: {
    textAlign: 'right'
  },
  voteCount: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: '4px'
  },
  percentage: {
    fontSize: '14px',
    color: '#6B7280'
  },
  progressBar: {
    width: '100%',
    height: '12px',
    backgroundColor: '#E5E7EB',
    borderRadius: '9999px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
    borderRadius: '9999px',
    transition: 'width 0.5s ease'
  },
  votersCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '24px'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    borderBottom: '2px solid #E5E7EB'
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    color: '#374151',
    fontWeight: '600'
  },
  tableRow: {
    borderBottom: '1px solid #E5E7EB'
  },
  td: {
    padding: '12px 16px',
    color: '#1F2937'
  },
  badgeAdmin: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: '#FEE2E2',
    color: '#991B1B'
  },
  badgeVoter: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: '#DBEAFE',
    color: '#1E40AF'
  },
  statusVoted: {
    color: '#10B981',
    fontWeight: '500'
  },
  statusNotVoted: {
    color: '#F59E0B',
    fontWeight: '500'
  },
  statusNA: {
    color: '#9CA3AF'
  }
};

export default AdminDashboard;