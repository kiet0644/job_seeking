'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  Badge,
  Box,
  Divider,
  Button,
  Flex,
} from '@chakra-ui/react';
import { getJobTypeLabel } from '@/utils/jobTypeLabel';

export default function JobDetailModal({ isOpen, onClose, job, onEdit }: {
  isOpen: boolean;
  onClose: () => void;
  job: any;
  onEdit?: (job: any) => void;
}) {
  if (!job) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{job.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="flex-end" mb={2}>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => onEdit && onEdit(job)}
            >
              Sửa tin
            </Button>
          </Flex>
          <Stack spacing={3}>
            <Text><b>Địa điểm:</b> {job.location || 'Không xác định'}</Text>
            <Text>
              <b>Mức lương:</b>{' '}
              {job.salaryMin && job.salaryMax
                ? `${job.salaryMin} - ${job.salaryMax} triệu`
                : job.salary || 'Thỏa thuận'}
            </Text>
            <Text><b>Loại hình:</b> {getJobTypeLabel(job.jobType)}</Text>
            <Text><b>Hạn nộp:</b> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Không có'}</Text>
            <Text><b>Trạng thái:</b>{' '}
              <Badge colorScheme={job.status === 'OPEN' ? 'teal' : 'gray'}>
                {job.status === 'OPEN' ? 'Đang tuyển' : job.status === 'CLOSED' ? 'Đã đóng' : 'Nháp'}
              </Badge>
            </Text>
            <Divider />
            <Box>
              <Text fontWeight="bold" mb={1}>Mô tả công việc:</Text>
              <Text whiteSpace="pre-line">{job.description}</Text>
            </Box>
            {job.requirements && (
              <Box>
                <Text fontWeight="bold" mb={1}>Yêu cầu:</Text>
                <Text whiteSpace="pre-line">{job.requirements}</Text>
              </Box>
            )}
            {job.benefits && (
              <Box>
                <Text fontWeight="bold" mb={1}>Quyền lợi:</Text>
                <Text whiteSpace="pre-line">{job.benefits}</Text>
              </Box>
            )}
            <Text fontSize="xs" color="gray.400" mt={2}>
              Đăng ngày: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ''}
            </Text>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}