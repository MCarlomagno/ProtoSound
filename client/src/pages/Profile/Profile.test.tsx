import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Profile from './Profile';

describe('Profile', () => {
  test('renders Feed page', async () => {
    render(<Profile/>)
    expect(screen.getByText('Profile')).toBeDefined()
  })
});
