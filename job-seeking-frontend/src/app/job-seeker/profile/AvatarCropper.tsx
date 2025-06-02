'use client';

import Cropper from 'react-easy-crop';
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, VStack } from '@chakra-ui/react';
import { useState, useCallback } from 'react';

export default function AvatarCropper({
  image,
  onCropComplete,
}: {
  image: string;
  onCropComplete: (croppedAreaPixels: any) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = useCallback(
    (_: any, croppedAreaPixels: any) => {
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete]
  );

  return (
    <VStack spacing={4}>
      <Box position="relative" w="250px" h="250px" bg="gray.100" rounded="full" overflow="hidden">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </Box>
      <Slider
        aria-label="zoom"
        width="200px"
        min={1}
        max={3}
        step={0.01}
        value={zoom}
        onChange={setZoom}
      >
        <SliderTrack>
          <SliderFilledTrack bg="teal.400" />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </VStack>
  );
}