import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { getInterArrivalsFromRange, poissonInterArrivals } from './utils/common';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Poisson Inter Arrivals', () => {
  test('Should not generate negative inter arrivals (fuzz test)', () => {
    for (let i = 0; i < 10; i++) {
      const lambda = Math.random() * 10;
      const interArrivals = poissonInterArrivals(lambda);
      const result = getInterArrivalsFromRange(interArrivals);

      if(interArrivals.find(ia => ia < 0) || result.find(ia => ia < 0)) {
        console.log('lambda', lambda, interArrivals.find(ia => ia < 0));
        console.log('lambda', lambda, result.find(ia => ia < 0));
      }
      expect(interArrivals.every((ia) => ia >= 0)).toBeTruthy();
      expect(result.every((ia) => ia >= 0)).toBeTruthy();
    }
  });
});
