'use client';
import { Box, Button, Heading, useToast, Flex } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '@/components/FormInput';
import { resetPassword } from '@/api/auth';
import { useSearchParams, useRouter } from 'next/navigation';

const ResetSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Tối thiểu 6 ký tự').required('Bắt buộc'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
    .required('Bắt buộc'),
});

export default function ResetPasswordPage() {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient="linear(to-br, teal.100, blue.50, white)">
      <Box bg="whiteAlpha.900" p={8} rounded="2xl" shadow="2xl" maxW="400px" w="100%">
        <Heading mb={6} textAlign="center" color="teal.600">
          Đặt lại mật khẩu
        </Heading>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={ResetSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await resetPassword(token || '', values.password);
              toast({
                title: 'Đặt lại mật khẩu thành công!',
                status: 'success',
                duration: 4000,
                position: 'top',
              });
              router.push('/login');
            } catch (err: any) {
              toast({
                title: 'Có lỗi xảy ra!',
                description: err.response?.data?.error || 'Không thể đặt lại mật khẩu.',
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
                label="Mật khẩu mới"
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
              <Button
                colorScheme="teal"
                type="submit"
                width="full"
                mt={4}
                isLoading={isSubmitting}
              >
                Đặt lại mật khẩu
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}