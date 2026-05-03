import React from 'react';
import { render, screen } from '@testing-library/react';
import { BoothCard } from './BoothCard';
import { LanguageProvider } from '../providers/LanguageProvider';
import { Booth } from '@/types';

const mockBooth: Booth = {
  id: 'B1',
  name: 'Test Booth',
  number: 123,
  address: '123 Test St',
  constituency: 'Test Const',
  district: 'Test Dist',
  state: 'Test State',
  latitude: 0,
  longitude: 0,
  accessibility: {
    ramp: true,
    wheelchair: true,
    drinkingWater: true,
    shade: false,
    toilets: true
  }
};

describe('BoothCard', () => {
  it('renders booth details correctly', () => {
    render(
      <LanguageProvider>
        <BoothCard booth={mockBooth} />
      </LanguageProvider>
    );
    
    expect(screen.getByText('Test Booth')).toBeInTheDocument();
    expect(screen.getByTestId('booth-number')).toHaveTextContent('Booth 123');
    expect(screen.getByText(/123 Test St/i)).toBeInTheDocument();
  });

  it('renders all facility badges correctly', () => {
    render(
      <LanguageProvider>
        <BoothCard booth={mockBooth} />
      </LanguageProvider>
    );
    
    const badges = screen.getByTestId('accessibility-badges');
    expect(badges).toHaveTextContent('Ramp');
    expect(badges).toHaveTextContent('Water');
    expect(badges).toHaveTextContent('Toilet');
    // Shade is false
    expect(badges).not.toHaveTextContent('Shade');
  });
});
