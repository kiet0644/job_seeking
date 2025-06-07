'use client';

import { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, Stack, Badge, Button, Flex, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { getEmployerJobs } from '@/api/job'; // Tạo hàm này ở src/api/job.ts

export default function EmployerHomePage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployerJobs()
      .then(res => setJobs(res.data))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="teal.700">
          Tin tuyển dụng của bạn
        </Heading>
        <Button as={Link} href="/employer/jobs/create" colorScheme="teal">
          Đăng tin mới
        </Button>
      </Flex>
      {loading ? (
        <Flex justify="center" py={10}><Spinner size="lg" color="teal.500" /></Flex>
      ) : (
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
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              minH="260px"
            >
              <Stack spacing={2} flex="1">
                <Heading size="md" mb={1}>{job.title}</Heading>
                <Text color="gray.600" fontWeight="medium">
                  Địa điểm: <b>{job.location || 'Không xác định'}</b>
                </Text>
                <Text color="gray.600">
                  Mức lương: <b>
                    {job.salaryMin && job.salaryMax
                      ? `${job.salaryMin} - ${job.salaryMax} triệu`
                      : job.salary || 'Thỏa thuận'}
                </b>
                </Text>
                <Text color="gray.600">
                  Loại hình: <b>{job.jobType || 'Không xác định'}</b>
                </Text>
                <Text color="gray.600">
                  Hạn nộp: <b>{job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Không có'}</b>
                </Text>
                <Text color="gray.600">
                  Ứng viên: <b>{job.applicants?.length ?? 0}</b>
                </Text>
                <Badge colorScheme={job.status === 'OPEN' ? 'teal' : 'gray'}>
                  {job.status === 'OPEN' ? 'Đang tuyển' : job.status === 'CLOSED' ? 'Đã đóng' : 'Nháp'}
                </Badge>
              </Stack>
              <Stack mt={4} direction="row" spacing={2}>
                <Button
                  as={Link}
                  href={`/employer/jobs/${job.id}`}
                  colorScheme="teal"
                  size="sm"
                >
                  Xem chi tiết
                </Button>
                {/* Có thể thêm nút sửa, xóa ở đây nếu muốn */}
              </Stack>
              <Text fontSize="xs" color="gray.400" mt={2}>
                Đăng ngày: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ''}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}