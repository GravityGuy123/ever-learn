import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmailVerificationForm from '../EmailVerificationForm';
import { axiosInstance } from '@/lib/axios.config';
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

jest.mock('@/lib/axios.config', () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

// Properly typed mock
const mockedAxiosPost = axiosInstance.post as jest.MockedFunction<typeof axiosInstance.post>;

describe('EmailVerificationForm', () => {
  const email = 'test@example.com';

  beforeEach(() => {
    mockedAxiosPost.mockReset();
  });

  it('sends a code when Send code is clicked', async () => {
    // Properly typed AxiosResponse
    const mockResponse: AxiosResponse<{ status: number }> = {
      data: { status: 201 },
      status: 201,
      statusText: 'Created',
      headers: {} as AxiosHeaders,
      config: {} as InternalAxiosRequestConfig,
    };

    mockedAxiosPost.mockResolvedValue(mockResponse);

    render(<EmailVerificationForm email={email} />);

    fireEvent.click(screen.getByText(/Send code/i));

    await waitFor(() =>
      expect(mockedAxiosPost).toHaveBeenCalledWith('/email/send-code', { email })
    );
  });

  it('verifies the code when Verify is clicked', async () => {
    const sendCodeResponse: AxiosResponse<{ status: number }> = {
      data: { status: 201 },
      status: 201,
      statusText: 'Created',
      headers: {} as AxiosHeaders,
      config: {} as InternalAxiosRequestConfig,
    };

    const verifyCodeResponse: AxiosResponse<{ status: number }> = {
      data: { status: 200 },
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosHeaders,
      config: {} as InternalAxiosRequestConfig,
    };

    mockedAxiosPost.mockResolvedValueOnce(sendCodeResponse);
    mockedAxiosPost.mockResolvedValueOnce(verifyCodeResponse);

    render(<EmailVerificationForm email={email} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter code/i), { target: { value: 'ABC123' } });
    fireEvent.click(screen.getByText(/Verify/i));

    await waitFor(() =>
      expect(mockedAxiosPost).toHaveBeenCalledWith('/email/verify', { email, code: 'ABC123' })
    );
  });
});