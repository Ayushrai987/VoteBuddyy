import '@testing-library/jest-dom';
import 'whatwg-fetch';


// Mock IntersectionObserver
if (typeof window !== 'undefined') {
  class IntersectionObserver {
    observe = jest.fn();
    disconnect = jest.fn();
    unobserve = jest.fn();
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  });
}


// Mock Google Maps
global.google = {
  maps: {
    LatLngBounds: jest.fn().mockImplementation(() => ({
      extend: jest.fn(),
    })),
    Map: jest.fn(),
    Marker: jest.fn(),
    InfoWindow: jest.fn(),
    Size: jest.fn(),
    Point: jest.fn(),
  },
};

// Mock localStorage
if (typeof window !== 'undefined') {
  const localStorageMock = (function() {
    let store = {};
    return {
      getItem: function(key) {
        return store[key] || null;
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      clear: function() {
        store = {};
      }
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });
}
