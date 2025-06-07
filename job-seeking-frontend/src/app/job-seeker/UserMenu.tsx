'use client';

import {
  Menu, MenuButton, MenuList, MenuItem, HStack, Avatar, Box, Text, Divider,
} from '@chakra-ui/react';
import { FiUser, FiLock, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { getAvatarUrl } from '@/utils/getAvatarUrl';

export default function UserMenu() {
  const user = useAuthStore((s) => s.user);

  return (
    <Menu>
      <MenuButton
        as={Box}
        cursor="pointer"
        p={1}
        rounded="full"
        _hover={{ bg: 'gray.100' }}
        transition="all 0.2s"
      >
        <Avatar
          name={user?.fullName}
          src={getAvatarUrl(user?.avatar)}
          size="sm"
          border="2px solid"
          borderColor="teal.400"
        />
      </MenuButton>
      <MenuList py={2} px={1} borderRadius="lg" boxShadow="md" minW="220px">
        <Box px={3} py={2}>
          <Text fontWeight="bold" fontSize="sm">{user?.fullName}</Text>
          <Text fontSize="xs" color="gray.500">{user?.email}</Text>
        </Box>
        <Divider my={1} />
        <MenuItem as={Link} href="/job-seeker/profile" icon={<FiUser />}>
          Trang cá nhân
        </MenuItem>
        <MenuItem as={Link} href="/auth/change-password" icon={<FiLock />}>
          Đổi mật khẩu
        </MenuItem>
        <Divider my={1} />
        <MenuItem
          color="red.500"
          icon={<FiLogOut />}
          onClick={() => {
            useAuthStore.getState().logout();
            window.location.href = '/auth/login';
          }}
        >
          Đăng xuất
        </MenuItem>
      </MenuList>
    </Menu>
  );
}