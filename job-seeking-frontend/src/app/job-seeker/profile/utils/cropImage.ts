export default function getCroppedImg(
  imageSrc: string,
  pixelCrop: any
): Promise<string> {
  return new Promise((resolve) => {
    const image = new window.Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        resolve(canvas.toDataURL('image/jpeg'));
      }
    };
  });
}
