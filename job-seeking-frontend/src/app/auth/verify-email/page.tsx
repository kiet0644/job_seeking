'use client';
import { Box, Button, Heading, Text, Flex } from '@chakra-ui/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/api/axiosInstance';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }
    axiosInstance
      .post('/auth/verify-email', { token })
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [token]);

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient="linear(to-br, teal.100, blue.50, white)">
      <Box bg="whiteAlpha.900" p={8} rounded="2xl" shadow="2xl" maxW="400px" w="100%" textAlign="center">
        <Heading mb={6} color="teal.600">
          Xác thực email
        </Heading>
        {status === 'pending' && <Text>Đang xác thực tài khoản...</Text>}
        {status === 'success' && (
          <>
            <Text color="green.500" mb={4}>Xác thực thành công! Bạn có thể đăng nhập.</Text>
            <Button colorScheme="teal" onClick={() => router.push('/auth/login')}>Đăng nhập</Button>
          </>
        )}
        {status === 'error' && (
          <>
            <Text color="red.500" mb={4}>Xác thực thất bại hoặc token không hợp lệ.</Text>
            <Button colorScheme="teal" onClick={() => router.push('/auth/login')}>Về trang đăng nhập</Button>
          </>
        )}
      </Box>
    </Flex>
  );
}