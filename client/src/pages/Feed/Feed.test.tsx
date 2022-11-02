import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Feed from './Feed';

describe('Feed', () => {
  test('renders Feed page', async () => {
    render(<Feed/>)
    expect(screen.getByText('Feed')).toBeDefined()
  })
});
