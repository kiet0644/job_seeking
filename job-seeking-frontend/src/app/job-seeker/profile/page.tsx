'use client';

import {
  Box,
  Heading,
  Avatar,
  Text,
  Stack,
  Badge,
  Divider,
  Button,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiCheckCircle, FiXCircle, FiUser, FiKey } from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const bg = useColorModeValue('white', 'gray.800');

  if (!user) return <Text>Không tìm thấy thông tin người dùng.</Text>;

  return (
    <Box
      maxW="500px"
      mx="auto"
      bg={bg}
      p={{ base: 4, md: 8 }}
      rounded="2xl"
      shadow="xl"
      mt={8}
    >
      <Stack align="center" spacing={4} mb={4}>
        <Box
          bgGradient="linear(to-br, teal.100, teal.300)"
          p={2}
          rounded="full"
          boxShadow="md"
        >
          <Avatar
            name={user.fullName}
            src={user.avatar || undefined}
            size="2xl"
            border="3px solid"
            borderColor="teal.400"
            bg="white"
          />
        </Box>
        <Heading size="lg" color="teal.700" textAlign="center">
          {user.fullName}
        </Heading>
        <Badge
          colorScheme="teal"
          fontSize="md"
          px={4}
          py={1}
          rounded="md"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Icon as={FiUser} mr={1} /> {user.role}
        </Badge>
      </Stack>
      <Divider my={6} />
      <Stack spacing={3}>
        <HStack>
          <Icon as={FiMail} color="teal.500" />
          <Text><b>Email:</b> {user.email}</Text>
        </HStack>
        <HStack>
          <Icon as={FiPhone} color="teal.500" />
          <Text><b>Số điện thoại:</b> {user.phone || 'Chưa cập nhật'}</Text>
        </HStack>
        <HStack>
          <Icon as={FiMapPin} color="teal.500" />
          <Text><b>Địa chỉ:</b> {user.address || 'Chưa cập nhật'}</Text>
        </HStack>
        <HStack>
          <Icon as={FiCalendar} color="teal.500" />
          <Text><b>Ngày tạo:</b> {new Date(user.createdAt).toLocaleDateString()}</Text>
        </HStack>
        <HStack>
          <Icon as={user.emailVerified ? FiCheckCircle : FiXCircle} color={user.emailVerified ? 'green.400' : 'red.400'} />
          <Text>
            <b>Trạng thái email:</b> {user.emailVerified ? 'Đã xác thực' : 'Chưa xác thực'}
          </Text>
        </HStack>
      </Stack>
      <Button
        mt={8}
        colorScheme="teal"
        variant="solid"
        leftIcon={<FiKey />}
        as="a"
        href="/auth/change-password"
        w="full"
        size="lg"
        fontWeight="bold"
        shadow="md"
      >
        Đổi mật khẩu
      </Button>
    </Box>
  );
}