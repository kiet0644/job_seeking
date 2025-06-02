'use client';
import { Box, Button, Heading, Text, useToast, Flex, SimpleGrid } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '@/components/FormInput';
import { register } from '@/api/auth';
import { useRouter } from 'next/navigation';

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Họ tên quá ngắn').required('Bắt buộc'),
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
  password: Yup.string().min(6, 'Tối thiểu 6 ký tự').required('Bắt buộc'),
  address: Yup.string().required('Bắt buộc'),
  phone: Yup.string().required('Bắt buộc'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
    .required('Bắt buộc'),
});

export default function RegisterPage() {
  const toast = useToast();
  const router = useRouter();

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient="linear(to-br, teal.100, blue.50, white)">
      <Box
        bg="whiteAlpha.900"
        p={{ base: 6, md: 10 }}
        rounded="2xl"
        shadow="2xl"
        w="100%"
        maxW="500px"
        zIndex={1}
      >
        <Heading mb={6} textAlign="center" color="teal.600">
          Đăng ký tài khoản
        </Heading>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            address: '',
            phone: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await register(
                values.email,
                values.password,
                values.fullName,
                values.address,
                values.phone
              );
              toast({
                title: 'Đăng ký thành công!',
                description: 'Vui lòng kiểm tra email để xác thực tài khoản trước khi đăng nhập.',
                status: 'success',
                duration: 4000,
                position: 'top', // hoặc 'top-right'
              });
              router.push('/auth/login');
            } catch (err: any) {
              const msg =
                err.response?.data?.error ||
                err.response?.data?.message ||
                'Đăng ký thất bại';
              toast({ title: msg, status: 'error', duration: 3000, position: 'top' });
              if (msg.toLowerCase().includes('email')) setErrors({ email: msg });
              else if (msg.toLowerCase().includes('password')) setErrors({ password: msg });
              else if (msg.toLowerCase().includes('fullName')) setErrors({ fullName: msg });
              else if (msg.toLowerCase().includes('address')) setErrors({ address: msg });
              else if (msg.toLowerCase().includes('phone')) setErrors({ phone: msg });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormInput
                  label="Họ tên"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName ? errors.fullName : undefined}
                />
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
                <FormInput
                  label="Nhập lại mật khẩu"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword ? errors.confirmPassword : undefined}
                />
                <FormInput
                  label="Địa chỉ"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address ? errors.address : undefined}
                />
                <FormInput
                  label="Số điện thoại"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone ? errors.phone : undefined}
                />
              </SimpleGrid>
              <Button
                colorScheme="teal"
                type="submit"
                width="full"
                mt={6}
                isLoading={isSubmitting}
              >
                Đăng ký
              </Button>
            </form>
          )}
        </Formik>
        <Text mt={4} textAlign="center" fontSize="sm">
          Đã có tài khoản?{' '}
          <Button
            variant="link"
            colorScheme="teal"
            onClick={() => router.push('/auth/login')}
          >
            Đăng nhập
          </Button>
        </Text>
      </Box>
    </Flex>
  );
}