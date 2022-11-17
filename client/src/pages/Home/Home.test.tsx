import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from "react-router-dom";
import Home from './Home';

describe('Home', () => {
  test('renders Home page', async () => {
    render(<Router><Home /></Router> )
    expect(screen.getByText('Create, Mint & Earn')).toBeDefined();
    expect(screen.getByText('Support, Listen & Collect')).toBeDefined();
  })
});
