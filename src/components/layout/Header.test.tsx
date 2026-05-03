import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { LanguageProvider } from '../providers/LanguageProvider';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const renderHeader = () => {
  return render(
    <LanguageProvider>
      <Header />
    </LanguageProvider>
  );
};

describe('Header (Navbar)', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  });

  it('renders all main links', () => {
    renderHeader();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Elections/i)).toBeInTheDocument();
    expect(screen.getByText(/States/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Chat/i)).toBeInTheDocument();
  });

  it('language toggle switches language correctly', () => {
    renderHeader();
    const toggle = screen.getByTestId('lang-toggle');
    
    // Initial English
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    
    // Switch to Hindi
    fireEvent.click(toggle);
    
    expect(screen.getAllByRole('link', { name: /मुख्य पृष्ठ/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /चुनाव/i })[0]).toBeInTheDocument();
  });

  it('mobile menu opens and shows links', () => {
    renderHeader();
    const menuBtn = screen.getByLabelText(/Toggle menu/i);
    
    fireEvent.click(menuBtn);
    
    // Links should appear in mobile menu
    const mobileHomeLinks = screen.getAllByRole('link', { name: /Home/i });
    expect(mobileHomeLinks.length).toBeGreaterThan(0);
  });
});
