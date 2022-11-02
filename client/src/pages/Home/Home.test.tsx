import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './Home';

describe('Home', () => {
  test('renders Feed page', async () => {
    render(<Home/>)
    expect(screen.getByText('Home')).toBeDefined()
  })
});
