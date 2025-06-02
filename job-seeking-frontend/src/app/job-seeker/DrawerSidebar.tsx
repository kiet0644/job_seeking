'use client';

import { Stack, HStack, Avatar, Box, Text, Link as ChakraLink, Divider } from '@chakra-ui/react';
import Link from 'next/link';
import { sidebarLinks } from './sidebarLinks';
import { usePathname } from 'next/navigation';

export default function DrawerSidebar({ user, onClose }: { user: any; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <Stack spacing={6} align="stretch">
      <HStack spacing={4} mb={2}>
        <Avatar
          name={user?.fullName}
          src={user?.avatar || undefined}
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