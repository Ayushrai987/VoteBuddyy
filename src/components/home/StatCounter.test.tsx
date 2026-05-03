import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { StatCounter } from './StatCounter';

// Mock IntersectionObserver to trigger the counter
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

class MockIntersectionObserver {
  observe = mockObserve;
  disconnect = mockDisconnect;
  constructor(callback: any) {
    this.callback = callback;
  }
  callback: any;
  trigger(isIntersecting: boolean) {
    this.callback([{ isIntersecting }]);
  }
}

describe('StatCounter', () => {
  let observer: MockIntersectionObserver;

  beforeEach(() => {
    jest.useFakeTimers();
    (global as any).IntersectionObserver = jest.fn().mockImplementation((cb) => {
      observer = new MockIntersectionObserver(cb);
      return observer;
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders target value after animation', () => {
    render(<StatCounter target={100} suffix="+" />);
    
    // Trigger intersection
    act(() => {
      observer.trigger(true);
    });

    // Fast forward animation
    act(() => {
      jest.advanceTimersByTime(2000); // More than enough for 40 steps of 25ms
    });

    expect(screen.getByTestId('stat-counter')).toHaveTextContent('100+');
  });

  it('starts at 0 before intersection', () => {
    render(<StatCounter target={100} />);
    expect(screen.getByTestId('stat-counter')).toHaveTextContent('0');
  });
});
