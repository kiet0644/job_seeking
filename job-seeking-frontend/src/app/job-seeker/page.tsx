'use client';

import { Box, Heading, SimpleGrid, Text, Stack, Badge, Button } from '@chakra-ui/react';

// Dữ liệu mẫu, bạn thay bằng fetch API nếu có
const jobs = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Công ty ABC',
    location: 'Hà Nội',
    salary: '20-30 triệu',
    type: 'FULL_TIME',
    createdAt: '2025-06-01',
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'Công ty XYZ',
    location: 'TP.HCM',
    salary: '25-35 triệu',
    type: 'FULL_TIME',
    createdAt: '2025-05-28',
  },
  // ...thêm job khác
];

export default function JobSeekerHomePage() {
  return (
    <Box>
      <Heading size="lg" mb={6} color="teal.700">
        Việc làm mới nhất
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {jobs.map((job) => (
          <Box
            key={job.id}
            bg="white"
            p={6}
            rounded="xl"
            shadow="md"
            borderLeft="6px solid #319795"
            _hover={{ shadow: 'lg', borderColor: 'teal.500' }}
            transition="all 0.2s"
          >
            <Stack spacing={2}>
              <Heading size="md">{job.title}</Heading>
              <Text color="gray.600">{job.company}</Text>
              <Text fontSize="sm" color="gray.500">{job.location}</Text>
              <Badge colorScheme="teal" w="fit-content">{job.type}</Badge>
              <Text fontWeight="bold" color="teal.600">{job.salary}</Text>
              <Text fontSize="xs" color="gray.400">Đăng ngày: {job.createdAt}</Text>
              <Button colorScheme="teal" size="sm" mt={2}>
                Xem chi tiết
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}