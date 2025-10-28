import React, { useState } from 'react';
import { DB } from '../data/database';

const VotePage = ({ error, success, setPage, handleVote }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const onVote = () => {
    if (selectedCandidate) {
      handleVote(selectedCandidate);
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.navLeft}>
            <span style={styles.logo}>🗳️ Cast Your Vote</span>
          </div>
          <button onClick={() => setPage('voter-dashboard')} style={styles.backBtn}>
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div style={styles.content}>
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

        <div style={styles.electionHeader}>
          <h2 style={styles.electionTitle}>Student Council Election 2025</h2>
          <p style={styles.electionSubtitle}>Select one candidate to cast your vote</p>
        </div>

        <div style={styles.candidatesGrid}>
          {DB.candidates.map(candidate => (
            <div
              key={candidate.id}
              style={{
                ...styles.candidateCard,
                ...(selectedCandidate === candidate.id ? styles.selectedCard : {})
              }}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <div style={styles.candidateAvatar}>
                {candidate.name.charAt(0)}
              </div>
              <h3 style={styles.candidateName}>{candidate.name}</h3>
              <p style={styles.candidateParty}>{candidate.party}</p>
              <p style={styles.candidateManifesto}>{candidate.manifesto}</p>
              {selectedCandidate === candidate.id && (
                <div style={styles.checkMark}>✅</div>
              )}
            </div>
          ))}
        </div>

        {selectedCandidate && (
          <div style={styles.confirmSection}>
            <button onClick={onVote} style={styles.confirmButton}>
              Confirm Vote
            </button>
          </div>
        )}
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
  backBtn: {
    color: '#3B82F6',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  content: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 20px'
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    border: '1px solid #FCA5A5',
    color: '#991B1B',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '24px'
  },
  successBox: {
    backgroundColor: '#D1FAE5',
    border: '1px solid #6EE7B7',
    color: '#065F46',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '24px'
  },
  electionHeader: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '24px',
    marginBottom: '24px'
  },
  electionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '8px'
  },
  electionSubtitle: {
    color: '#6B7280'
  },
  candidatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  candidateCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '24px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textAlign: 'center',
    position: 'relative'
  },
  selectedCard: {
    border: '3px solid #3B82F6',
    boxShadow: '0 4px 16px rgba(59,130,246,0.3)'
  },
  candidateAvatar: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    margin: '0 auto 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold'
  },
  candidateName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '8px'
  },
  candidateParty: {
    color: '#3B82F6',
    fontWeight: '500',
    marginBottom: '12px'
  },
  candidateManifesto: {
    color: '#6B7280',
    fontSize: '14px'
  },
  checkMark: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    fontSize: '32px'
  },
  confirmSection: {
    textAlign: 'center'
  },
  confirmButton: {
    backgroundColor: '#10B981',
    color: 'white',
    padding: '14px 32px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
  }
};

export default VotePage;