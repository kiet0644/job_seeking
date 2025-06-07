'use client';

import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Stack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { sidebarLinks } from './sidebarLinks';
import DrawerSidebar from './DrawerSidebar';
import UserMenu from './UserMenu';
import { usePathname } from 'next/navigation';

export default function JobSeekerLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  return (
    <Flex minH="100vh" direction="column" bg="gray.50">
      {/* Topbar desktop */}
      <Flex
        display={{ base: 'none', md: 'flex' }}
        as="nav"
        align="center"
        justify="space-between"
        px={8}
        py={3}
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        shadow="sm"
        zIndex={10}
        position="sticky"
        top={0}
      >
        <HStack spacing={10}>
          {/* Logo hoặc tên app */}
          <ChakraLink
            as={Link}
            href="/"
            _hover={{ textDecoration: 'none' }}
            display="flex"
            alignItems="center"
          >
            <Text fontWeight="bold" fontSize="xl" color="teal.600" letterSpacing="wide">
              JobSeeker
            </Text>
          </ChakraLink>
          {sidebarLinks.map((link) => (
            <ChakraLink
              as={Link}
              href={link.href}
              key={link.href}
              fontWeight="medium"
              fontSize="md"
              px={4}
              py={2}
              rounded="lg"
              transition="all 0.2s"
              _hover={{ bg: 'teal.50', color: 'teal.600', textDecoration: 'none' }}
              bg={pathname === link.href ? 'teal.50' : undefined}
              color={pathname === link.href ? 'teal.700' : undefined}
            >
              {link.label}
            </ChakraLink>
          ))}
        </HStack>
        <UserMenu />
      </Flex>
      {/* Topbar mobile */}
      <Flex
        display={{ base: 'flex', md: 'none' }}
        align="center"
        justify="space-between"
        px={4}
        py={3}
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        shadow="sm"
        zIndex={10}
      >
        <UserMenu />
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Mở menu"
          variant="outline"
          onClick={onOpen}
        />
      </Flex>
      {/* Drawer sidebar mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="teal.500" color="white" fontWeight="bold">
            Khu vực Ứng viên
          </DrawerHeader>
          <DrawerBody>
            <DrawerSidebar user={user} onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* Main content */}
      <Box flex="1" p={{ base: 2, md: 8 }}>
        {children}
      </Box>
    </Flex>
  );
}