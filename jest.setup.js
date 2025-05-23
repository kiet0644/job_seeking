jest.mock('@/utils/email.service', () => ({
  sendEmail: jest.fn().mockResolvedValue({ message: 'Mocked email sent' }),
}));