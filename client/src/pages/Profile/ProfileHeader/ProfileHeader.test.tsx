import {render} from '@testing-library/react';
import { ProfileHeader } from './ProfileHeader';
import '@testing-library/jest-dom';

jest.mock('../../../hooks/useIPFS', () => ({
  ipfs: {},
  uploadFiles: jest.fn(),
}))

describe('ProfileHeader', () => {
  test('renders ProfileHeader page', async () => {})
});
