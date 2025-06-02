'use client';
import { Box, Button, Heading, Text, useToast, Flex } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '@/components/FormInput';
import { forgotPassword } from '@/api/auth';

const ForgotSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
});

export default function ForgotPasswordPage() {
  const toast = useToast();

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient="linear(to-br, teal.100, blue.50, white)">
      <Box bg="whiteAlpha.900" p={8} rounded="2xl" shadow="2xl" maxW="400px" w="100%">
        <Heading mb={6} textAlign="center" color="teal.600">
          Quên mật khẩu
        </Heading>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={ForgotSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await forgotPassword(values.email);
              toast({
                title: 'Đã gửi email đặt lại mật khẩu!',
                description: 'Vui lòng kiểm tra email để tiếp tục.',
                status: 'success',
                duration: 4000,
                position: 'top',
              });
            } catch (err: any) {
              toast({
                title: 'Có lỗi xảy ra!',
                description: err.response?.data?.error || 'Không thể gửi email.',
                status: 'error',
                duration: 4000,
                position: 'top',
              });
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
              <Button
                colorScheme="teal"
                type="submit"
                width="full"
                mt={4}
                isLoading={isSubmitting}
              >
                Gửi yêu cầu
              </Button>
            </form>
          )}
        </Formik>
        <Text mt={4} textAlign="center" fontSize="sm">
          <Button
            variant="link"
            colorScheme="teal"
            onClick={() => window.location.href = '/auth/login'}
          >
            Quay lại đăng nhập
          </Button>
        </Text>
      </Box>
    </Flex>
  );
}