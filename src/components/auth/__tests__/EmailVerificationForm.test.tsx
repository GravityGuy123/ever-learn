import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmailVerificationForm from '../EmailVerificationForm';
import { axiosInstance } from '@/lib/axios.config';

jest.mock('@/lib/axios.config', () => ({
  axiosInstance: {
    post: jest.fn()
  }
}));

describe('EmailVerificationForm', () => {
  const email = 'test@example.com';

  beforeEach(() => {
    (axiosInstance.post as jest.Mock).mockReset();
  });

  it('sends a code when Send code is clicked', async () => {
    (axiosInstance.post as jest.Mock).mockResolvedValue({ status: 201 });
    render(<EmailVerificationForm email={email} />);

    fireEvent.click(screen.getByText(/Send code/i));

    await waitFor(() => expect(axiosInstance.post).toHaveBeenCalledWith('/email/send-code', { email }));
  });

  it('verifies the code when Verify is clicked', async () => {
    (axiosInstance.post as jest.Mock).mockResolvedValueOnce({ status: 201 });
    (axiosInstance.post as jest.Mock).mockResolvedValueOnce({ status: 200 });

    render(<EmailVerificationForm email={email} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter code/i), { target: { value: 'ABC123' } });
    fireEvent.click(screen.getByText(/Verify/i));

    await waitFor(() => expect(axiosInstance.post).toHaveBeenCalledWith('/email/verify', { email, code: 'ABC123' }));
  });
});
