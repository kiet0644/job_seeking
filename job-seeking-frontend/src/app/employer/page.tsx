'use client';

import { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, Stack, Badge, Button, Flex, Spinner, useToast, Tooltip } from '@chakra-ui/react';
import Link from 'next/link';
import { getEmployerJobs, updateJobStatus } from '@/api/job'; // Tạo hàm này ở src/api/job.ts
import JobDetailModal from './JobDetailModal';
import EditJobModal from './EditJobModal';
import { getJobTypeLabel } from '@/utils/jobTypeLabel';
import { FiEyeOff, FiEye, FiCheckCircle, FiXCircle, FiEdit3 } from 'react-icons/fi';

export default function EmployerHomePage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    getEmployerJobs()
      .then(res => setJobs(res.data))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenModal = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleEditJob = (job: any) => {
    setIsModalOpen(false); // đóng modal chi tiết
    setEditingJob(job);
    setIsEditModalOpen(true); // mở modal sửa
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingJob(null);
  };

  const handleToggleStatus = async (job: any) => {
    const newStatus = job.status === 'OPEN' ? 'CLOSED' : 'OPEN';
    try {
      await updateJobStatus(job.id, newStatus);
      toast({
        title: `Đã chuyển trạng thái sang ${newStatus === 'OPEN' ? 'Đang tuyển' : 'Đã đóng'}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      // reload lại jobs
      getEmployerJobs()
        .then(res => setJobs(res.data))
        .catch(() => setJobs([]));
    } catch {
      toast({
        title: 'Chuyển trạng thái thất bại!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

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
                <Flex align="center" gap={2}>
                  <Heading size="md" mb={1}>{job.title}</Heading>
                  <Badge
                    px={2}
                    py={0.5}
                    fontSize="0.9em"
                    rounded="md"
                    colorScheme={
                      job.status === 'OPEN'
                        ? 'teal'
                        : job.status === 'CLOSED'
                        ? 'orange'
                        : 'gray'
                    }
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    {job.status === 'OPEN' && <FiCheckCircle style={{ marginRight: 4 }} />}
                    {job.status === 'CLOSED' && <FiXCircle style={{ marginRight: 4 }} />}
                    {job.status === 'DRAFT' && <FiEdit3 style={{ marginRight: 4 }} />}
                    {job.status === 'OPEN'
                      ? 'Đang tuyển'
                      : job.status === 'CLOSED'
                      ? 'Đã đóng'
                      : 'Nháp'}
                  </Badge>
                </Flex>
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
                  Loại hình: <b>{getJobTypeLabel(job.jobType)}</b>
                </Text>
                <Text color="gray.600">
                  Hạn nộp: <b>{job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Không có'}</b>
                </Text>
                <Text color="gray.600">
                  Ứng viên: <b>{job.applicants?.length ?? 0}</b>
                </Text>
              </Stack>
              <Stack mt={4} direction="row" spacing={2}>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleOpenModal(job)}
                  leftIcon={<FiEye />}
                >
                  Xem chi tiết
                </Button>
                <Tooltip
                  label={job.status === 'OPEN' ? 'Đóng tin tuyển dụng này' : 'Mở lại tin tuyển dụng'}
                  hasArrow
                  placement="top"
                >
                  <Button
                    colorScheme={job.status === 'OPEN' ? 'orange' : 'green'}
                    size="sm"
                    variant="outline"
                    leftIcon={job.status === 'OPEN' ? <FiEyeOff /> : <FiEye />}
                    onClick={() => handleToggleStatus(job)}
                    _hover={{
                      bg: job.status === 'OPEN' ? 'orange.50' : 'green.50',
                      borderColor: job.status === 'OPEN' ? 'orange.400' : 'green.400',
                    }}
                  >
                    {job.status === 'OPEN' ? 'Đóng tin' : 'Mở lại'}
                  </Button>
                </Tooltip>
              </Stack>
              <Text fontSize="xs" color="gray.400" mt={2}>
                Đăng ngày: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ''}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
      <JobDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        job={selectedJob}
        onEdit={handleEditJob}
      />
      <EditJobModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        job={editingJob}
        onSuccess={() => {
          setIsEditModalOpen(false);
          setEditingJob(null);
          // reload lại jobs
          getEmployerJobs()
            .then(res => setJobs(res.data))
            .catch(() => setJobs([]));
        }}
      />
    </Box>
  );
}