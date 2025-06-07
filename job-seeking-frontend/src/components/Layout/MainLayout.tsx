'use client';

import { Flex, Box } from '@chakra-ui/react';

export default function MainLayout({
  children,
  topbar,
  sidebar,
}: {
  children: React.ReactNode;
  topbar?: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <Flex minH="100vh" direction="column" bg="gray.50">
      {topbar}
      <Flex flex="1" w="100%">
        {sidebar && <Box minW="220px">{sidebar}</Box>}
        <Box flex="1" p={{ base: 2, md: 8 }}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}