'use client';
import { Box, Button, Heading, Text, useToast, Flex, Image } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '@/components/FormInput';
import { login } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
  password: Yup.string().min(6, 'Tối thiểu 6 ký tự').required('Bắt buộc'),
});

export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, teal.100, blue.50, white)"
      position="relative"
    >
      {/* Hình nền mờ */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        zIndex={0}
        bgImage="url('/login-bg.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity={0.08}
        pointerEvents="none"
      />
      <Box
        bg="whiteAlpha.900"
        p={{ base: 6, md: 10 }}
        rounded="2xl"
        shadow="2xl"
        w="100%"
        maxW="400px"
        zIndex={1}
      >
        <Heading mb={6} textAlign="center" color="teal.600">
          Đăng nhập
        </Heading>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const res = await login(values.email, values.password);
              useAuthStore.getState().setAuth(res.data.token, res.data.user);

              toast({ title: 'Đăng nhập thành công!', status: 'success', duration: 2000 });

              // Redirect theo role
              switch (res.data.user.role) {
                case 'ADMIN':
                  router.push('/admin');
                  break;
                case 'MODERATOR':
                  router.push('/moderator');
                  break;
                case 'JOB_SEEKER':
                  router.push('/job-seeker');
                  break;
                case 'PREMIUM_JOB_SEEKER':
                  router.push('/premium-job-seeker');
                  break;
                case 'EMPLOYER':
                  router.push('/employer');
                  break;
                case 'PREMIUM_EMPLOYER':
                  router.push('/premium-employer');
                  break;
                default:
                  router.push('/');
              }
            } catch (err: any) {
              const msg =
                err.response?.data?.error ||
                err.response?.data?.message ||
                'Đăng nhập thất bại';
              toast({ title: msg, status: 'error', duration: 3000 });
              if (msg.toLowerCase().includes('email')) setErrors({ email: msg });
              else if (msg.toLowerCase().includes('password')) setErrors({ password: msg });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : undefined}
              />
              <FormInput
                label="Mật khẩu"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password : undefined}
              />
              <Box textAlign="right" mt={-2} mb={2}>
                <Button
                  variant="link"
                  colorScheme="teal"
                  fontSize="sm"
                  px={0}
                  onClick={() => router.push('/auth/forgot-password')}
                >
                  Quên mật khẩu?
                </Button>
              </Box>
              <Button
                colorScheme="teal"
                type="submit"
                width="full"
                mt={2}
                isLoading={isSubmitting}
                size="lg"
                fontWeight="bold"
                rounded="xl"
                shadow="md"
                _hover={{ bg: 'teal.500', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                Đăng nhập
              </Button>
            </form>
          )}
        </Formik>
        <Text mt={6} textAlign="center" fontSize="sm" color="gray.600">
          Chưa có tài khoản?{' '}
          <Button
            variant="link"
            colorScheme="teal"
            fontWeight="bold"
            onClick={() => router.push('/auth/register')}
          >
            Đăng ký
          </Button>
        </Text>
      </Box>
    </Flex>
  );
}