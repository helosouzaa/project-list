import React from 'react';
import { render } from '@testing-library/react';
import Statistics from '../Statistics';

describe('Statistics component', () => {
    beforeEach(() => {

      const localStorageMock = (() => {
        let store = {};
        return {
          getItem: jest.fn((key) => store[key] || null),
          setItem: jest.fn((key, value) => {
            store[key] = value.toString();
          }),
          clear: jest.fn(() => {
            store = {};
          }),
          removeItem: jest.fn((key) => {
            delete store[key];
          }),
        };
      })();
      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    });
  
    afterEach(() => {

      window.localStorage.clear();
    });
  
    it('renders statistics correctly with no projects', () => {
      const { getByText } = render(<Statistics />);
  
      expect(getByText('Statistics')).toBeInTheDocument();
      expect(getByText('Total Projects: 0')).toBeInTheDocument();
      expect(getByText('Projects To Do: 0')).toBeInTheDocument();
      expect(getByText('Projects Doing: 0')).toBeInTheDocument();
      expect(getByText('Projects Done: 0')).toBeInTheDocument();
    });
  
    it('renders statistics correctly with projects', () => {
      const projects = [
        { id: 1, status: 'To Do' },
        { id: 2, status: 'Doing' },
        { id: 3, status: 'Done' },
      ];

      window.localStorage.getItem = jest.fn(() => JSON.stringify(projects));
  
      const { getByText } = render(<Statistics />);
  
      expect(getByText('Statistics')).toBeInTheDocument();
      expect(getByText('Total Projects: 3')).toBeInTheDocument();
      expect(getByText('Projects To Do: 1')).toBeInTheDocument();
      expect(getByText('Projects Doing: 1')).toBeInTheDocument();
      expect(getByText('Projects Done: 1')).toBeInTheDocument();
    });
  });
  