import { render, screen } from '@testing-library/react';
import { UserCollected } from './UserCollected';
import '@testing-library/jest-dom';
import mockdata from '../../../mockdata.json';

describe('UserCollected', () => {
  test('renders UserReleases page', async () => {
    render(<UserCollected />);
    const firstSong = screen.queryByText(mockdata[0].name);
    expect(firstSong).not.toBeNull();
  })
});