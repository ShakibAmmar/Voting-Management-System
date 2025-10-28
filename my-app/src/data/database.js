// Simulated Backend Database
export const DB = {
  users: [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', hasVoted: false },
    { id: 2, username: 'voter1', password: 'voter123', role: 'voter', hasVoted: false },
    { id: 3, username: 'voter2', password: 'voter123', role: 'voter', hasVoted: false },
    { id: 4, username: 'voter3', password: 'voter123', role: 'voter', hasVoted: false },
    { id: 5, username: 'voter4', password: 'voter123', role: 'voter', hasVoted: false },
    { id: 6, username: 'voter5', password: 'voter123', role: 'voter', hasVoted: false },
    { id: 7, username: 'voter6', password: 'voter123', role: 'voter', hasVoted: false },
    { id: 8, username: 'voter7', password: 'voter123', role: 'voter', hasVoted: false },
    { id: 9, username: 'voter8', password: 'voter123', role: 'voter', hasVoted: false },
    { id: 10, username: 'voter9', password: 'voter123', role: 'voter', hasVoted: false },
    { id: 11, username: 'voter10', password: 'voter123', role: 'voter', hasVoted: false }
  ],
  elections: [
    {
      id: 1,
      title: 'Student Council Election 2025',
      description: 'Annual student council election',
      status: 'active',
      startDate: '2025-10-20',
      endDate: '2025-10-25'
    }
  ],
  candidates: [
    { id: 1, electionId: 1, name: 'Shakib Ammar', party: 'Progressive Party', manifesto: 'Better facilities and student welfare' },
    { id: 2, electionId: 1, name: 'Abbas Malik ', party: 'Unity Party', manifesto: 'Enhanced learning environment' },
    { id: 3, electionId: 1, name: 'ibrahim Saifi', party: 'Innovation Party', manifesto: 'Technology-driven education' }
  ],
  votes: []
};