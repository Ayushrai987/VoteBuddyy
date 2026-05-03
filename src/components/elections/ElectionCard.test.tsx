import React from 'react';
import { render, screen } from '@testing-library/react';
import { ElectionCard } from './ElectionCard';
import { LanguageProvider } from '../providers/LanguageProvider';
import { Election } from '@/types';

const mockElection: Election = {
  id: 'test-1',
  name: 'Uttar Pradesh Assembly',
  year: 2026,
  type: 'Vidhan Sabha',
  totalSeats: 403,
  status: 'upcoming',
  electionDate: '2026-05-15',
  isAnnounced: false,
  phases: []
};

describe('ElectionCard', () => {
  it('renders correct election details', () => {
    render(
      <LanguageProvider>
        <ElectionCard election={mockElection} />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('election-name')).toHaveTextContent('Uttar Pradesh');
    expect(screen.getByText(/403 Seats - 2026/i)).toBeInTheDocument();
  });

  it('shows correct status badge based on date', () => {
    // Current date is 2026-05-03 in metadata
    // Mock election is 2026-05-15, which is > 7 days away -> Upcoming
    render(
      <LanguageProvider>
        <ElectionCard election={mockElection} />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('status-badge')).toHaveTextContent('Upcoming');
  });

  it('shows Live badge if election is within 7 days', () => {
    const liveElection = { ...mockElection, electionDate: '2026-05-05' };
    render(
      <LanguageProvider>
        <ElectionCard election={liveElection} />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('status-badge')).toHaveTextContent('Live');
  });

  it('shows Concluded badge if election is in past', () => {
    const pastElection = { ...mockElection, electionDate: '2024-05-05' };
    render(
      <LanguageProvider>
        <ElectionCard election={pastElection} />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('status-badge')).toHaveTextContent('Concluded');
  });
});
