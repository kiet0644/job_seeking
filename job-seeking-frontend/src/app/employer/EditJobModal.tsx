'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  useToast,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { JobStatus } from '@/types/enums';
import { createJob, updateJob } from '@/api/job';

export default function EditJobModal({
  isOpen,
  onClose,
  job,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  job: any;
  onSuccess?: () => void;
}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    requirements: '',
    benefits: '',
    location: '',
    salary: '',
    salaryMin: '',
    salaryMax: '',
    type: 'FULL_TIME',
    quantity: 1,
    experience: '',
    level: '',
    deadline: '',
    skills: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (job) {
      setForm({
        title: job.title || '',
        description: job.description || '',
        requirements: job.requirements || '',
        benefits: job.benefits || '',
        location: job.location || '',
        salary: job.salary || '',
        salaryMin: job.salaryMin?.toString() || '',
        salaryMax: job.salaryMax?.toString() || '',
        type: job.jobType || 'FULL_TIME',
        quantity: job.quantity || 1,
        experience: job.experience || '',
        level: job.level || '',
        deadline: job.deadline ? new Date(job.deadline).toISOString().slice(0, 10) : '',
        skills: job.skills || '',
      });
    }
  }, [job]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNumberChange = (value: string) => {
    setForm({ ...form, quantity: Number(value) });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.title) newErrors.title = 'Vui lòng nhập vị trí tuyển dụng';
    if (!form.description) newErrors.description = 'Vui lòng nhập mô tả công việc';
    if (!form.location) newErrors.location = 'Vui lòng nhập địa điểm';
    if (!form.deadline) newErrors.deadline = 'Vui lòng chọn hạn nộp hồ sơ';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await updateJob(job.id, {
        title: form.title,
        description: form.description,
        location: form.location,
        salary: form.salary,
        salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
        jobType: form.type,
        deadline: form.deadline ? new Date(form.deadline) : undefined,
        requirements: form.requirements,
        benefits: form.benefits,
        experience: form.experience,
        level: form.level,
        status: job.status || JobStatus.OPEN,
      });
      toast({
        title: 'Cập nhật tin thành công!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onSuccess && onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: 'Cập nhật thất bại!',
        description: error?.response?.data?.message || 'Có lỗi xảy ra.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sửa tin tuyển dụng</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} mt={2}>
              <FormControl isRequired isInvalid={!!errors.title}>
                <FormLabel>Vị trí tuyển dụng</FormLabel>
                <Input name="title" value={form.title} onChange={handleChange} />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.description}>
                <FormLabel>Mô tả công việc</FormLabel>
                <Textarea name="description" value={form.description} onChange={handleChange} rows={5} />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Yêu cầu ứng viên</FormLabel>
                <Textarea name="requirements" value={form.requirements} onChange={handleChange} rows={3} />
              </FormControl>
              <FormControl>
                <FormLabel>Quyền lợi</FormLabel>
                <Textarea name="benefits" value={form.benefits} onChange={handleChange} rows={3} />
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.location}>
                <FormLabel>Địa điểm</FormLabel>
                <Input name="location" value={form.location} onChange={handleChange} />
                <FormErrorMessage>{errors.location}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Mức lương (text)</FormLabel>
                <Input name="salary" value={form.salary} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Lương tối thiểu</FormLabel>
                <Input
                  type="number"
                  name="salaryMin"
                  value={form.salaryMin}
                  onChange={handleChange}
                  min={0}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Lương tối đa</FormLabel>
                <Input
                  type="number"
                  name="salaryMax"
                  value={form.salaryMax}
                  onChange={handleChange}
                  min={0}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Số lượng tuyển</FormLabel>
                <NumberInput min={1} value={form.quantity} onChange={handleNumberChange}>
                  <NumberInputField name="quantity" />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Kinh nghiệm</FormLabel>
                <Input name="experience" value={form.experience} onChange={handleChange} placeholder="VD: 2 năm" />
              </FormControl>
              <FormControl>
                <FormLabel>Cấp bậc</FormLabel>
                <Input name="level" value={form.level} onChange={handleChange} placeholder="VD: Nhân viên, Trưởng nhóm..." />
              </FormControl>
              <FormControl>
                <FormLabel>Kỹ năng</FormLabel>
                <Input name="skills" value={form.skills} onChange={handleChange} placeholder="VD: ReactJS, NodeJS..." />
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.deadline}>
                <FormLabel>Hạn nộp hồ sơ</FormLabel>
                <Input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
                <FormErrorMessage>{errors.deadline}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Hình thức</FormLabel>
                <Select name="type" value={form.type} onChange={handleChange}>
                  <option value="FULL_TIME">Full-time</option>
                  <option value="PART_TIME">Part-time</option>
                  <option value="INTERNSHIP">Thực tập</option>
                  <option value="REMOTE">Remote</option>
                </Select>
              </FormControl>
              <Button colorScheme="teal" type="submit" isLoading={loading}>
                Lưu thay đổi
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}