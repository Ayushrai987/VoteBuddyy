import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageProvider';

const TestComponent = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="trans">{t('common.explore')}</span>
      <button onClick={() => setLanguage('hi')}>Switch to Hindi</button>
    </div>
  );
};

describe('LanguageProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should provide default language as English', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('trans')).toHaveTextContent('Explore');
  });

  it('should toggle language to Hindi', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    fireEvent.click(screen.getByText('Switch to Hindi'));
    
    expect(screen.getByTestId('lang')).toHaveTextContent('hi');
    expect(screen.getByTestId('trans')).toHaveTextContent('देखें');
  });

  it('should persist language in localStorage', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    fireEvent.click(screen.getByText('Switch to Hindi'));
    expect(window.localStorage.getItem('language')).toBe('hi');
  });

  it('should load language from localStorage on mount', () => {
    window.localStorage.setItem('language', 'hi');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('lang')).toHaveTextContent('hi');
  });

  it('should return path if key is missing in both current and fallback', () => {
    const MissingKeyComponent = () => {
      const { t } = useLanguage();
      return <span data-testid="missing">{t('non.existent.key')}</span>;
    };
    render(
      <LanguageProvider>
        <MissingKeyComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('missing')).toHaveTextContent('non.existent.key');
  });
});
