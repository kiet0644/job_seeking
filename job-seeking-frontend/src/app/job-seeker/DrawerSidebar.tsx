'use client';

import { Stack, HStack, Avatar, Box, Text, Link as ChakraLink, Divider } from '@chakra-ui/react';
import Link from 'next/link';
import { getSidebarLinks } from '@/app/sidebarLinks'; // import hàm bạn vừa tạo
import { usePathname } from 'next/navigation';
import { getAvatarUrl } from '@/utils/getAvatarUrl';
import { UserRole } from '@/types/enums';

export default function DrawerSidebar({ user, onClose }: { user: any; onClose?: () => void }) {
  const pathname = usePathname();
  const sidebarLinks = getSidebarLinks(user?.role as UserRole); // lấy links theo role

  return (
    <Stack spacing={6} align="stretch">
      <HStack spacing={4} mb={2}>
        <Avatar
          name={user?.fullName}
          src={getAvatarUrl(user?.avatar)}
          size="lg"
          border="2px solid"
          borderColor="teal.400"
        />
        <Box>
          <Text fontWeight="bold">{user?.fullName}</Text>
          <Text fontSize="sm" color="gray.500">{user?.email}</Text>
        </Box>
      </HStack>
      <Divider />
      <Stack align="stretch" spacing={2} mt={2}>
        {sidebarLinks.map((link) => (
          <ChakraLink
            as={Link}
            href={link.href}
            key={link.href}
            px={3}
            py={2}
            rounded="md"
            fontWeight="medium"
            _hover={{ bg: 'teal.50', color: 'teal.600' }}
            bg={pathname === link.href ? 'teal.50' : undefined}
            color={pathname === link.href ? 'teal.700' : undefined}
            onClick={onClose}
            transition="all 0.2s"
          >
            {link.label}
          </ChakraLink>
        ))}
      </Stack>
    </Stack>
  );
}