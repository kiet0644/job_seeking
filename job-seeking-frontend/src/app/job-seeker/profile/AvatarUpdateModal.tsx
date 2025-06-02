'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Stack,
  Avatar,
  Button,
  Input,
  Icon,
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';
import { useRef, useState } from 'react';
import AvatarCropper from './AvatarCropper';
import getCroppedImg from './utils/cropImage';

export default function AvatarUpdateModal({
  isOpen,
  onClose,
  user,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSave?: (file: File | null, preview: string | null) => void;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setPreview(URL.createObjectURL(f));
      setFile(f);
    }
  };

  const handleSave = async () => {
    if (preview && croppedAreaPixels) {
      const croppedImg = await getCroppedImg(preview, croppedAreaPixels);
      if (onSave) onSave(file, croppedImg);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cập nhật ảnh đại diện</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack align="center" spacing={4}>
            {preview ? (
              <AvatarCropper
                image={preview}
                onCropComplete={setCroppedAreaPixels}
              />
            ) : (
              <Avatar
                size="2xl"
                src={user.avatar || undefined}
                name={user.fullName}
                border="3px solid"
                borderColor="teal.400"
                bg="white"
              />
            )}
            <Button
              leftIcon={<FiUpload />}
              colorScheme="teal"
              variant="outline"
              onClick={() => inputFileRef.current?.click()}
            >
              Chọn ảnh mới
            </Button>
            <Input
              ref={inputFileRef}
              type="file"
              accept="image/*"
              display="none"
              onChange={handleFileChange}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3} variant="ghost">
            Đóng
          </Button>
          <Button colorScheme="teal" isDisabled={!preview} onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}